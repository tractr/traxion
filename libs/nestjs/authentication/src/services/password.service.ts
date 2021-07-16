import * as Crypto from 'crypto';

import { Inject, Injectable } from '@nestjs/common';
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
import { AuthenticationOptions } from '../interfaces';
import { AuthenticationService } from './authentication.service';

import { MailerService } from '@tractr/nestjs-mailer';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
    private readonly authenticationService: AuthenticationService,
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
    private mailerService: MailerService,
  ) {}

  async requestReset(email: string): Promise<void> {
    const idField = this.authenticationOptions.user.idField ?? 'id';
    const nameField = this.authenticationOptions.user.nameField ?? 'email';
    const resetCodeField =
      this.authenticationOptions.password.reset.codeField ?? 'resetCode';

    // Get user from email
    const user = await this.authenticationService.findUserByLogin(email, {
      [idField]: true,
      [nameField]: true,
    });

    const userId = user?.[idField];

    if (!user || !userId) throw new UserNotFoundError();

    // Create reset code
    const resetCode = this.createResetCode(
      this.authenticationOptions.password.reset.codeLength,
    );

    // Link user to token in database
    await this.userService.update({
      where: {
        [idField]: user[idField],
      },
      data: {
        [resetCodeField]: resetCode,
      },
    });

    const userName = user?.[nameField];
    const link = this.authenticationOptions.password.reset.link
      .replace('{{id}}', userId)
      .replace('{{code}}', resetCode);

    const message: mailjet.Email.SendParamsMessage = {
      From: {
        Email: this.authenticationOptions.mailer.from,
        ...(this.authenticationOptions.mailer.name
          ? { Name: this.authenticationOptions.mailer.name }
          : {}),
      },
      To: [{ Email: email }],
      Subject: this.authenticationOptions.password.reset.subject,
      ...(this.authenticationOptions.password.reset.template
        ? {
            TemplateID: this.authenticationOptions.password.reset.template,
          }
        : {
            HTMLPart: DEFAULT_RESET_HTML,
          }),
      Variables: {
        name: userName,
        link,
      },
    };

    // Send email
    await this.mailerService.send({
      Messages: [message],
    });
  }

  createResetCode(length = 128): string {
    return Crypto.randomBytes(Math.floor(length / 2)).toString('hex');
  }

  async reset(
    userId: string,
    resetCode: string,
    password: string,
  ): Promise<void> {
    const idField = this.authenticationOptions.user.idField ?? 'id';
    const resetCodeField =
      this.authenticationOptions.password.reset.codeField ?? 'resetCode';
    const passwordField =
      this.authenticationOptions.user.passwordField ?? 'password';

    // Get user
    const user = await this.findUserById(userId, { [resetCodeField]: true });
    if (!user) throw new UserNotFoundError();

    // Check if the reset code match
    if (resetCode !== user?.[resetCodeField]) throw new BadResetCodeError();

    // Hash and set the password
    const passwordHashed = await this.authenticationService.hashPassword(
      password,
    );
    await this.userService.update({
      where: {
        [idField]: userId,
      },
      data: {
        [passwordField]: passwordHashed,
        [resetCodeField]: null,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUserById(id: string, select?: any): Promise<User | null> {
    const idField = this.authenticationOptions.user.idField ?? 'id';

    const findOneWhere = {
      [idField]: id,
    };

    return this.userService.findUnique({
      where: findOneWhere,
      ...(select ? { select } : {}),
    });
  }
}
