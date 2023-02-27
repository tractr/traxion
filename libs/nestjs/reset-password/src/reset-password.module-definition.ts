import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ResetPasswordModuleOptions } from './interfaces';

import {
  addImportsAndProvidersExtra,
  addProviderWithInjectionTokenExtra,
  ImportsExtra,
  ProvidersExtra,
  ProviderWithInjectionToken,
} from '@trxn/nestjs-core';
import { MailerService } from '@trxn/nestjs-mailer';
import { USER_SERVICE, UserService } from '@trxn/nestjs-user';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ResetPasswordModuleOptions>()
  .setExtras<
    ImportsExtra &
      ProvidersExtra & {
        MailerService?: ProviderWithInjectionToken<
          typeof MailerService,
          MailerService
        >;
        UserService?: ProviderWithInjectionToken<
          typeof USER_SERVICE,
          UserService
        >;
      }
  >(
    { imports: [], providers: [] },
    addImportsAndProvidersExtra(
      (definition, { UserService: User, MailerService: Mailer }) =>
        addProviderWithInjectionTokenExtra(
          addProviderWithInjectionTokenExtra(definition, USER_SERVICE, User),
          MailerService,
          Mailer,
        ),
    ),
  )
  .build();
