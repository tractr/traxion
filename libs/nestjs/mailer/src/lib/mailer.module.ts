import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MailerCliService } from './cli';
import { MAILER_MODULE_OPTIONS } from './constants';
import { MailerOptions, MailerPublicOptions } from './interfaces';
import { MailerService } from './services';

import { ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({
  imports: [HttpModule],
  providers: [MailerService, MailerCliService],
  exports: [MailerService, MailerCliService],
})
export class MailerModule extends ModuleOptionsFactory<
  MailerOptions,
  MailerPublicOptions
>(MAILER_MODULE_OPTIONS) {}
