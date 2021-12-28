import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import * as mailjet from 'node-mailjet';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
  DEFAULT_RESET_HTML,
} from '../constants';
import { AuthenticationOptions } from '../dtos';
import { BadResetCodeError, UserNotFoundError } from '../errors';
import { RequestResetOptions, UserService, UserType } from '../interfaces';

import { MailerService } from '@tractr/nestjs-mailer';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(AUTHENTICATION_USER_SERVICE)
    private readonly userService: UserService,
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
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
    login: string,
    options: RequestResetOptions = {},
  ): Promise<void> {
    this.assertPasswordResetIsActive();

    const { idField, loginField, passwordField, emailField } =
      this.authenticationOptions.userConfig;

    // Get user from email
    const user = await this.userService.findUnique({
      where: {
        [loginField]: login,
      },
      select: {
        [idField]: true,
        [loginField]: true,
        [passwordField]: true,
        [emailField]: true,
      },
    });

    if (!user) throw new UserNotFoundError();

    const resetCode = this.createResetCode(user);

    const { link, subject, template, variables } = {
      ...this.authenticationOptions.password.reset,
      ...options,
    };
    const { from, name } = this.authenticationOptions.mailer || {};

    if (!from) throw new Error('mailer from config has not been set');

    const linkWithCode = link
      .replace('{{id}}', user[idField] as string)
      .replace('{{code}}', resetCode);

    const message: mailjet.Email.SendParamsMessage = {
      From: {
        Email: from,
        ...(name ? { Name: name } : {}),
      },
      To: [{ Email: user.email as string }],
      TemplateLanguage: true,
      Subject: subject,
      ...(template
        ? { TemplateID: template }
        : { HTMLPart: DEFAULT_RESET_HTML }),
      Variables: {
        link: linkWithCode,
        email: user.email,
        ...(variables ?? {}),
      },
    };

    // Send email
    await this.mailerService.send({
      Messages: [message],
    });
  }

  getUserSecret(user: UserType) {
    const { idField, loginField, passwordField } =
      this.authenticationOptions.userConfig;
    return `${user[idField] as string}-${user[passwordField] as string}-${
      user[loginField] as string
    }`;
  }

  createResetCode(user: UserType, options: JwtSignOptions = {}): string {
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
    user: UserType,
    resetCode: string,
    options: JwtVerifyOptions = {},
  ): Promise<{ sub: UserType['id'] }> {
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
    const { idField } = this.authenticationOptions.userConfig;

    const user = await this.userService.findUnique({
      where: {
        [idField]: userId,
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
