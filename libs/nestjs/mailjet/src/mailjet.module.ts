import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailjet.module-definition';
import { MailjetClient, MailjetService } from './services';

import { MAILER_CLIENT } from '@trxn/nestjs-mailer';

@Module({
  providers: [MailjetClient, MailjetService],
  exports: [
    MailjetClient,
    MailjetService,
    { provide: MAILER_CLIENT, useExisting: MailjetService },
  ],
})
export class MailjetModule extends ConfigurableModuleClass {}
