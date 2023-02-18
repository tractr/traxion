import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './services';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule extends ConfigurableModuleClass {}
