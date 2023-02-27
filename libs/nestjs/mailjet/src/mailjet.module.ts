import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailjet.module-definition';
import { MailjetClient, MailjetService } from './services';

import { MAILER_CLIENT } from '@trxn/nestjs-mailer';

@Module({
  providers: [
    MailjetClient,
    MailjetService,
    { provide: MAILER_CLIENT, useExisting: MailjetService },
  ],
  exports: [MailjetClient, MailjetService, MAILER_CLIENT],
})
export class MailjetModule extends ConfigurableModuleClass {}
