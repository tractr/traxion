import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MailerCliService } from './cli';
import { MAILER_MODULE_OPTIONS } from './constants';
import { MailerOptions, MailerPublicOptions } from './interfaces';
import { MailerService } from './services';
import { ResetPasswordSendEmailService } from './services/reset-password-send-email.service';

import { ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({
  imports: [HttpModule],
  providers: [MailerService, MailerCliService, ResetPasswordSendEmailService],
  exports: [MailerService, ResetPasswordSendEmailService],
})
export class MailerModule extends ModuleOptionsFactory<
  MailerOptions,
  MailerPublicOptions
>(MAILER_MODULE_OPTIONS) {}
