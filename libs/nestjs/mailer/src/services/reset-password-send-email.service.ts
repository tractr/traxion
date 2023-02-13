import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { MailerService } from './mailer.service';
import { DEFAULT_RESET_HTML, DEFAULT_UPDATED_HTML } from '../constants';
import {
  ResetPasswordSendEmail,
  SendRequestResetPasswordEmailFactory,
  SendUpdatedPasswordEmailFactory,
} from '../interfaces';

@Injectable()
export class ResetPasswordSendEmailService implements ResetPasswordSendEmail {
  constructor(private readonly mailerService: MailerService) {}

  sendRequestResetPasswordEmailFactory(
    options: SendRequestResetPasswordEmailFactory,
  ) {
    if (!options.from) {
      throw new Error(
        'send request reset password email: from option is required',
      );
    }

    return async (link: string, resetCode: string, user: User) =>
      this.mailerService.send({
        ...options,
        to: user.email,
        html: options.html ?? DEFAULT_RESET_HTML,
        context: {
          ...options.context,
          link,
          resetCode,
          email: user.email,
        },
      });
  }

  sendUpdatedPasswordEmailFactory(options: SendUpdatedPasswordEmailFactory) {
    if (!options.from) {
      throw new Error(
        'send request reset password email: from option is required',
      );
    }

    return async (user: User) =>
      this.mailerService.send({
        ...options,
        to: user.email,
        html: options.html ?? DEFAULT_UPDATED_HTML,
        context: {
          ...options.context,
          email: user.email,
        },
      });
  }
}
