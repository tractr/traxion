import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import * as mailjet from 'node-mailjet';

import {
  USER_SERVICE,
  UserService,
} from '../../generated/nestjs-models-common';
import { User } from '../../prisma/client';
import {
  AUTHENTICATION_MODULE_OPTIONS,
  DEFAULT_RESET_HTML,
} from '../constants';
import { BadResetCodeError, UserNotFoundError } from '../errors';
import {
  AuthenticationOptions,
  RequestResetOptions,
  UserWithEmailAndPassword,
} from '../interfaces';
import { AuthenticationService } from './authentication.service';

import { MailerService } from '@tractr/nestjs-mailer';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  assertPasswordResetIsActive() {
    if (!this.authenticationOptions.password.reset.active)
      throw new Error(
        'password reset is not activated. You cannot use this method unless you activate the options inside the authentication module',
      );
  }

  async requestReset(
    email: string,
    options: RequestResetOptions = {},
  ): Promise<void> {
    this.assertPasswordResetIsActive();

    // Get user from email
    const user: UserWithEmailAndPassword = await this.userService.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
      rejectOnNotFound: true,
    });

    const resetCode = this.createResetCode(user);

    const { link, subject, template } = {
      ...this.authenticationOptions.password.reset,
      ...options,
    };
    const { from, name } = this.authenticationOptions.mailer || {};

    if (!from) throw new Error('mailer from config has not been set');

    const linkWithCode = link
      .replace('{{id}}', user.id)
      .replace('{{code}}', resetCode);

    const message: mailjet.Email.SendParamsMessage = {
      From: {
        Email: from,
        ...(name ? { Name: name } : {}),
      },
      To: [{ Email: email }],
      Subject: subject,
      ...(template
        ? { TemplateID: template }
        : { HTMLPart: DEFAULT_RESET_HTML }),
      Variables: {
        link: linkWithCode,
      },
    };

    // Send email
    await this.mailerService.send({
      Messages: [message],
    });
  }

  getUserSecret(user: UserWithEmailAndPassword) {
    return `${user.id}-${user.password}-${user.email}`;
  }

  createResetCode(
    user: UserWithEmailAndPassword,
    options: JwtSignOptions = {},
  ): string {
    // Maybe we could add the created at instead of email and id
    return this.jwtService.sign(
      { sub: user.id },
      {
        expiresIn: '24h',
        ...options,
        secret: this.getUserSecret(user),
      },
    );
  }

  verifyResetCode(
    user: UserWithEmailAndPassword,
    resetCode: string,
    options: JwtVerifyOptions = {},
  ): Promise<{ sub: User['id'] }> {
    return this.jwtService.verifyAsync(resetCode, {
      ...options,
      secret: this.getUserSecret(user),
    });
  }

  async reset(
    userId: string,
    resetCode: string,
    password: string,
  ): Promise<void> {
    this.assertPasswordResetIsActive();

    const user = await this.userService.findUnique({
      where: {
        id: userId,
      },
      select: { id: true, password: true, email: true },
    });

    if (!user) throw new UserNotFoundError();

    try {
      const payload = await this.verifyResetCode(user, resetCode);
      if (payload.sub !== user.id) throw new Error();
    } catch {
      throw new BadResetCodeError();
    }

    await this.userService.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}
