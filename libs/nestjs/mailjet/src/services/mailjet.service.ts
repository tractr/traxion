import { Injectable } from '@nestjs/common';
import { SendEmailV3_1 as SendEmailMailjet } from 'node-mailjet';

import { MailjetClient } from './mailjet-client.service';
import { MAILJET_API_VERSION } from '../configs';

import { MailerClient, SendEmailParams } from '@trxn/nestjs-mailer';

@Injectable()
export class MailjetService implements MailerClient {
  constructor(protected mailjetClient: MailjetClient) {}

  public async send({
    from,
    to,
    context = {},
    html,
    subject,
    text,
  }: SendEmailParams) {
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

    const data: SendEmailMailjet.Body = {
      Messages: [message],
      SandboxMode: this.mailjetClient.sandboxMode,
    };

    return this.mailjetClient
      .post('send', { version: MAILJET_API_VERSION })
      .request(data);
  }
}
