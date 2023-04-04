import {
  FactorySansProvider,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';

import { AUTHENTICATION_OPTIONS } from './constants';
import { authenticationModuleOptionsFactory } from './services';
import { AuthenticationOptions } from './types';

@NgModule({})
export class AngularAuthenticationModule {
  static forRoot(
    options: AuthenticationOptions,
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return {
      ngModule: AngularAuthenticationModule,
      providers: [
        {
          provide: AUTHENTICATION_OPTIONS,
          useFactory: () => authenticationModuleOptionsFactory(options),
        },
      ],
    };
  }

  static forRootFactory<T extends unknown[]>(
    options: FactorySansProvider & {
      useFactory: (...args: T) => AuthenticationOptions;
    },
  ): ModuleWithProviders<AngularAuthenticationModule> {
    return {
      ngModule: AngularAuthenticationModule,
      providers: [
        {
          provide: AUTHENTICATION_OPTIONS,
          ...options,
          useFactory: (...args: T) =>
            authenticationModuleOptionsFactory(options.useFactory(...args)),
        },
      ],
    };
  }
}
