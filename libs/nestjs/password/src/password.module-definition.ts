import { ConfigurableModuleBuilder } from '@nestjs/common';

import { PasswordModuleOptions } from './interfaces';

import {
  addImportsAndProvidersExtra,
  addProviderWithInjectionTokenExtra,
  ImportsExtra,
  ProvidersExtra,
  ProviderWithInjectionToken,
} from '@trxn/nestjs-core';
import { USER_SERVICE, UserService } from '@trxn/nestjs-user';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PasswordModuleOptions>()
  .setExtras<
    ImportsExtra &
      ProvidersExtra & {
        UserService?: ProviderWithInjectionToken<
          typeof USER_SERVICE,
          UserService
        >;
      }
  >(
    { imports: [], providers: [] },
    addImportsAndProvidersExtra((definition, { UserService: User }) =>
      addProviderWithInjectionTokenExtra(definition, USER_SERVICE, User),
    ),
  )
  .build();
