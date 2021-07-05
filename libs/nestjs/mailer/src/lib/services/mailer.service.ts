import { Inject, Injectable } from '@nestjs/common';
import * as mailjet from 'node-mailjet';

import { MAILJET_API_VERSION } from '../configs';
import { MAILER_MODULE_OPTIONS } from '../constants';
import { areWeTestingWithJest } from '../helpers';
import { MailerOptions } from '../interfaces';

@Injectable()
export class MailerService {
  mailjetClient!: mailjet.Email.Client;

  constructor(
    @Inject(MAILER_MODULE_OPTIONS)
    private readonly mailerOptions: MailerOptions,
  ) {
    this.connectToMailjetApi();
  }

  public async send(
    params: mailjet.Email.SendParams,
  ): Promise<mailjet.Email.PostResponse | null> {
    if (areWeTestingWithJest()) return null;

    return this.mailjetClient
      .post('send', { version: MAILJET_API_VERSION })
      .request(params);
  }

  private connectToMailjetApi(): void {
    this.mailjetClient = mailjet.connect(
      this.mailerOptions.publicApiKey,
      this.mailerOptions.privateApiKey,
    );
  }
}
