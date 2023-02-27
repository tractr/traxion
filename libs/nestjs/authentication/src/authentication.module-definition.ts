import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ENCRYPTION_SERVICE } from './constants';
import { AuthenticationModuleOptions } from './interfaces';

import { EncryptionService } from '@trxn/nestjs-bcrypt';
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
} = new ConfigurableModuleBuilder<AuthenticationModuleOptions>()
  .setExtras<
    ImportsExtra &
      ProvidersExtra & {
        UserService?: ProviderWithInjectionToken<
          typeof USER_SERVICE,
          UserService
        >;
        EncryptionService?: ProviderWithInjectionToken<
          typeof ENCRYPTION_SERVICE,
          EncryptionService
        >;
      }
  >(
    { imports: [], providers: [] },
    addImportsAndProvidersExtra(
      (definition, { UserService: User, EncryptionService: Encryption }) =>
        addProviderWithInjectionTokenExtra(
          addProviderWithInjectionTokenExtra(
            definition,
            ENCRYPTION_SERVICE,
            Encryption,
          ),
          USER_SERVICE,
          User,
        ),
    ),
  )
  .build();
