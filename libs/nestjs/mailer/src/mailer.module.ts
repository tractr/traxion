import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './services';
import { ResetPasswordSendEmailService } from './services/reset-password-send-email.service';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule],
  providers: [MailerService, ResetPasswordSendEmailService],
  exports: [MailerService, ResetPasswordSendEmailService],
})
export class MailerModule extends ConfigurableModuleClass {}
