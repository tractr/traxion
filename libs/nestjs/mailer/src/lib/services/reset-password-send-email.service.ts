import { Injectable } from '@nestjs/common';
import * as mailjet from 'node-mailjet';

import { MailerService } from './mailer.service';
import { DEFAULT_RESET_HTML, DEFAULT_UPDATED_HTML } from '../constants';

@Injectable()
export class ResetPasswordSendEmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendRequestResetPasswordEmailFactory({
    from,
    templateId,
    subject,
    variables,
  }: {
    from: string;
    templateId?: number;
    subject?: string;
    variables?: Record<string, unknown>;
  }): (
    link: string,
    resetCode: string,
    user: Record<string, string | number>,
  ) => Promise<void> | void {
    return async (
      link: string,
      resetCode: string,
      user: Record<string, string | number>,
    ) => {
      if (!from) {
        throw new Error(
          'send request reset password email: from option is required',
        );
      }

      const message: mailjet.Email.SendParamsMessage = {
        From: {
          Email: from,
        },
        To: [{ Email: user.email as string }],
        TemplateLanguage: true,
        Subject: subject,
        ...(templateId
          ? { TemplateID: templateId }
          : { HTMLPart: DEFAULT_RESET_HTML }),
        Variables: {
          link,
          email: user.email,
          ...(variables ?? {}),
        },
      };

      await this.mailerService.send({
        Messages: [message],
      });
    };
  }

  sendUpdatedPasswordEmailFactory({
    from,
    templateId,
    subject,
    variables,
  }: {
    from: string;
    templateId?: number;
    subject?: string;
    variables?: Record<string, unknown>;
  }): (user: Record<string, string | number>) => Promise<void> | void {
    return async (user: Record<string, string | number>) => {
      if (!from) {
        throw new Error(
          'send request reset password email: from option is required',
        );
      }

      const message: mailjet.Email.SendParamsMessage = {
        From: {
          Email: from,
        },
        To: [{ Email: user.email as string }],
        TemplateLanguage: true,
        Subject: subject,
        ...(templateId
          ? { TemplateID: templateId }
          : { HTMLPart: DEFAULT_UPDATED_HTML }),
        Variables: {
          email: user.email,
          ...(variables ?? {}),
        },
      };

      await this.mailerService.send({
        Messages: [message],
      });
    };
  }
}
