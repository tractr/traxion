import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailjet.module-definition';
import { MailjetClient, MailjetService } from './services';

@Module({
  providers: [MailjetClient, MailjetService],
  exports: [MailjetClient, MailjetService],
})
export class MailjetModule extends ConfigurableModuleClass {}
