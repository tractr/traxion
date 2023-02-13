import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailjet.module-definition';
import { MailjetService } from './services';

import { MAILER_CLIENT_TOKEN } from '@trxn/nestjs-mailer';

@Module({
  imports: [],
  providers: [{ provide: MAILER_CLIENT_TOKEN, useClass: MailjetService }],
  exports: [MAILER_CLIENT_TOKEN],
})
export class MailjetModule extends ConfigurableModuleClass {}
