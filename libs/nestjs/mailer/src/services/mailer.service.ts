import { Inject, Injectable, Logger } from '@nestjs/common';

import { MAILER_CLIENT } from '../constants';
import {
  MailerClient,
  MailerModuleOptions,
  SendEmailParams,
} from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../mailer.module-definition';

import { LoggerService } from '@trxn/nestjs-core';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly mailerOptions: MailerModuleOptions,

    @Inject(MAILER_CLIENT)
    private readonly mailerClient: MailerClient,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MailerService.name);
  }

  public async send(params: SendEmailParams): Promise<unknown> {
    this.logger.debug('Sending email: ', params);

    if (!this.mailerOptions.production) {
      this.logger.debug(
        'Server is in development mode, email has not been send via the MailerClient',
      );
      return null;
    }

    return this.mailerClient.send(params);
  }
}
