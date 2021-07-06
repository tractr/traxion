import { HttpModule, Module } from '@nestjs/common';

import { MailerCliService } from './cli';
import { MAILER_DEFAULT_OPTIONS } from './configs';
import { MAILER_MODULE_OPTIONS } from './constants';
import { MailerOptions } from './interfaces';
import { MailerService } from './services';

import { ModuleOptionsHelper } from '@tractr/nestjs-core';

@Module({
  imports: [HttpModule],
  providers: [MailerService, MailerCliService],
  exports: [MailerService, MailerCliService],
})
export class MailerModule extends ModuleOptionsHelper<Partial<MailerOptions>>(
  MAILER_MODULE_OPTIONS,
  MAILER_DEFAULT_OPTIONS,
) {}
