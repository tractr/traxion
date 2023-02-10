import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MailerCliService } from './cli';
import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './services';
import { ResetPasswordSendEmailService } from './services/reset-password-send-email.service';

@Module({
  imports: [HttpModule],
  providers: [MailerService, MailerCliService, ResetPasswordSendEmailService],
  exports: [MailerService, ResetPasswordSendEmailService],
})
export class MailerModule extends ConfigurableModuleClass {}
