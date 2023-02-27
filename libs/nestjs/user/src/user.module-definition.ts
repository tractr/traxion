import { ConfigurableModuleBuilder } from '@nestjs/common';

import { USER_SERVICE } from './constants';
import { UserModuleOptions, UserOrmService } from './interfaces';

import {
  addImportsAndProvidersExtra,
  addProviderWithInjectionTokenExtra,
  ImportsExtra,
  ProvidersExtra,
  ProviderWithInjectionToken,
} from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<UserModuleOptions>()
  .setExtras<
    ImportsExtra &
      ProvidersExtra & {
        UserService?: ProviderWithInjectionToken<
          typeof USER_SERVICE,
          UserOrmService
        >;
      }
  >(
    { imports: [], providers: [] },
    addImportsAndProvidersExtra((definition, { UserService }) =>
      addProviderWithInjectionTokenExtra(definition, USER_SERVICE, UserService),
    ),
  )
  .build();
