import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import {
  DEFAULT_RESET_PASSWORD_LINK,
  DEFAULT_RESET_PASSWORD_REQUEST_EMAIL_HTML,
  DEFAULT_RESET_PASSWORD_SUCCEED_EMAIL_HTML,
} from '../constants';
import { BadResetCodeError } from '../errors';
import { ResetPasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../reset-password.module-definition';

import { UserNotFoundError } from '@trxn/nestjs-authentication';
import { MailerService, SendEmailParams } from '@trxn/nestjs-mailer';
import { MinimalUser, UserId, UserService } from '@trxn/nestjs-user';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly resetPasswordModuleOptions: ResetPasswordModuleOptions,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  /**
   * Send a reset code to the user's email
   * @param user User The user to send the reset code to (id email and password are required)
   */
  async requestResetPassword(id: UserId): Promise<void> {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const {
      from,
      expiresIn,
      requestPasswordEmailParams = (params: SendEmailParams) => params,
      linkFactory = DEFAULT_RESET_PASSWORD_LINK,
      userSecretFactory = this.userSecretFactory.bind(this),
    } = this.resetPasswordModuleOptions;

    const userId = this.userService.getIdFromUser(user);

    const resetCode = this.resetCodeFactory(
      userId,
      await userSecretFactory(this.request, user),
      expiresIn,
    );

    const link = await Promise.resolve(
      typeof linkFactory === 'string'
        ? linkFactory
            .replace('{{id}}', `${userId}`)
            .replace('{{code}}', resetCode)
        : linkFactory(this.request, resetCode, user),
    );

    await this.mailerService.send(
      requestPasswordEmailParams({
        from,
        to: user.email,
        subject: 'Reset your password',
        context: {
          email: user.email,
          link,
          resetCode,
        },
        html: DEFAULT_RESET_PASSWORD_REQUEST_EMAIL_HTML,
      }),
    );
  }

  async reset(
    userId: UserId,
    resetCode: string,
    resetPassword: string,
  ): Promise<void> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const {
      from,
      updatePasswordSuccessEmailParams = (params: SendEmailParams) => params,
      userSecretFactory = this.userSecretFactory.bind(this),
    } = this.resetPasswordModuleOptions;

    try {
      const payload = await this.verifyResetCode(
        await userSecretFactory(this.request, user),
        resetCode,
      );

      if (!payload.sub || payload.sub !== this.userService.getIdFromUser(user))
        throw new Error();
    } catch {
      throw new BadResetCodeError();
    }

    await this.userService.updatePassword(userId, resetPassword);

    await this.mailerService.send(
      updatePasswordSuccessEmailParams({
        from,
        to: user.email,
        subject: 'Password updated',
        context: {
          email: user.email,
        },
        html: DEFAULT_RESET_PASSWORD_SUCCEED_EMAIL_HTML,
      }),
    );
  }

  async userSecretFactory(
    request: Record<string, unknown>,
    { id, email, password }: MinimalUser,
  ) {
    return `${id}-${password}-${email}`;
  }

  resetCodeFactory(
    id: UserId,
    secret: string,
    expiresIn?: string | number,
  ): string {
    return this.jwtService.sign(
      { sub: id },
      { expiresIn: expiresIn || '24h', secret },
    );
  }

  verifyResetCode(
    secret: string,
    resetCode: string,
  ): Promise<{ sub: User['id'] }> {
    return this.jwtService.verifyAsync(resetCode, {
      secret,
    });
  }
}
