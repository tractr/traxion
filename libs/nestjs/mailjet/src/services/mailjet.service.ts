import { Inject, Injectable } from '@nestjs/common';
import { Client, SendEmailV3_1 as SendEmailMailjet } from 'node-mailjet';
import { RequestData } from 'node-mailjet/declarations/request/Request';

import { MAILJET_API_VERSION } from '../configs';
import { MailjetModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../mailjet.module-definition';

import { isProduction } from '@trxn/nestjs-core';
import { SendEmail } from '@trxn/nestjs-mailer';

@Injectable()
export class MailjetService {
  mailjetClient!: Client;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    mailerOptions: MailjetModuleOptions,
  ) {
    this.mailjetClient = new Client(mailerOptions);
  }

  public isDevelopment(): boolean {
    return !isProduction() || process.env.JEST_WORKER_ID !== undefined;
  }

  public async send({
    from,
    to,
    context = {},
    html,
    subject,
    text,
  }: SendEmail) {
    const { templateId, ...variables } = context;

    const message: SendEmailMailjet.Message = {
      From: {
        Email: from,
      },
      To: (Array.isArray(to) ? to : [to]).map((email) => ({ Email: email })),
      TemplateLanguage: true,
      Subject: subject,
      ...(templateId
        ? { TemplateID: templateId as number }
        : { HTMLPart: html, TextPart: text }),
      Variables: variables,
    };

    const data: RequestData = {
      SandboxMode: this.isDevelopment(),
      Messages: [message],
    };

    return this.mailjetClient
      .post('send', { version: MAILJET_API_VERSION })
      .request(data);
  }
}
