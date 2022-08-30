import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { DEFAULT_RESET_PASSWORD_LINK } from '../constants';
import { BadResetCodeError } from '../errors';
import { PasswordModuleOptions, UserInfo } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';
import { UserPasswordService } from './user-password.service';

import { UserNotFoundError } from '@tractr/nestjs-authentication';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly passwordConfig: PasswordModuleOptions,
    private readonly jwtService: JwtService,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  /**
   * Send a reset code to the user's email
   * @param user User The user to send the reset code to (id email and password are required)
   */
  async requestResetPassword(
    login: string,
  ): Promise<{ link: string; resetCode: string }> {
    const user = await this.userPasswordService.getUserFromLogin(login);

    if (!user) {
      throw new UserNotFoundError();
    }

    // We first generate the reset code and get a JWT Token
    const resetCode = this.createResetCode(user);

    const resetPasswordLink =
      this.passwordConfig.resetPasswordLinkFactory ||
      DEFAULT_RESET_PASSWORD_LINK;

    const link = await Promise.resolve(
      typeof resetPasswordLink === 'string'
        ? resetPasswordLink
            .replace('{{id}}', `${user.id}`)
            .replace('{{code}}', resetCode)
        : resetPasswordLink(
            this.request,
            resetCode,
            this.userPasswordService.getUserFromUserInfo(user),
          ),
    );

    if (this.passwordConfig.resetPasswordSendEmail?.request) {
      // We call the method to send the email and wait for the response
      await Promise.resolve(
        this.passwordConfig.resetPasswordSendEmail.request(
          link,
          resetCode,
          this.userPasswordService.getUserFromUserInfo(user),
        ),
      );
    }

    return { link, resetCode };
  }

  getUserSecret({ id, email, password }: UserInfo) {
    return `${id}-${password}-${email}`;
  }

  createResetCode({ id, email, password }: UserInfo): string {
    return this.jwtService.sign(
      { sub: id },
      {
        expiresIn: this.passwordConfig.resetPasswordExpiresIn || '24h',
        secret: this.getUserSecret({ id, email, password }),
      },
    );
  }

  verifyResetCode(
    { id, email, password }: UserInfo,
    resetCode: string,
  ): Promise<{ sub: User['id'] }> {
    return this.jwtService.verifyAsync(resetCode, {
      secret: this.getUserSecret({ id, email, password }),
    });
  }

  async reset(
    userId: string | number,
    resetCode: string,
    resetPassword: string,
  ): Promise<void> {
    const user = await this.userPasswordService.getUserFromId(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      const payload = await this.verifyResetCode(user, resetCode);
      if (payload.sub !== user.id) throw new Error();
    } catch {
      throw new BadResetCodeError();
    }

    await this.userPasswordService.updateUserPassword(userId, resetPassword);

    if (this.passwordConfig.resetPasswordSendEmail?.updated) {
      // We call the method to send the email and wait for the response
      await Promise.resolve(
        this.passwordConfig.resetPasswordSendEmail.updated(
          this.userPasswordService.getUserFromUserInfo(user),
        ),
      );
    }
  }
}
