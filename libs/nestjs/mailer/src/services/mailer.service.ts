import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'node-mailjet';

import { MAILJET_API_VERSION } from '../configs';
import { areWeTestingWithJest } from '../helpers';
import { MailerModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../mailer.module-definition';

import { isProduction } from '@trxn/nestjs-core';

@Injectable()
export class MailerService {
  mailjetClient!: Client;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly mailerOptions: MailerModuleOptions,
  ) {
    const { apiKey, apiSecret, apiToken } = mailerOptions;

    this.mailjetClient = new Client({
      apiKey,
      apiSecret,
      apiToken,
    });
  }

  public async send(
    params: mailjet.Email.SendParams,
  ): Promise<mailjet.Email.PostResponse | null> {
    if (areWeTestingWithJest()) return null;

    return this.mailjetClient
      .post('send', { version: MAILJET_API_VERSION })
      .request({
        SandboxMode: !isProduction(),
        ...params,
      });
  }
}
