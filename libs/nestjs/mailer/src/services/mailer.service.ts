import { Inject, Injectable, Logger } from '@nestjs/common';

import { MAILER_CLIENT_TOKEN } from '../constants';
import { MailerClient, MailerModuleOptions, SendEmail } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../mailer.module-definition';

import { isProduction, LoggerService } from '@trxn/nestjs-core';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly mailerOptions: MailerModuleOptions,

    @Inject(MAILER_CLIENT_TOKEN)
    private readonly mailerClient: MailerClient,

    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MailerService.name);
  }

  public isDevelopment(): boolean {
    return (
      this.mailerOptions.development ||
      !isProduction() ||
      process.env.JEST_WORKER_ID !== undefined
    );
  }

  public async send(params: SendEmail): Promise<unknown> {
    this.logger.debug('Sending email: ', params);

    if (this.isDevelopment()) {
      this.logger.debug(
        'Server is in development mode, email has not been send via the MailerClient',
      );
      return null;
    }

    return this.mailerClient.send(params);
  }
}
