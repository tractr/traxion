import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PasswordModuleOptions } from './interfaces';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './password.module-definition';
import { HashService, PasswordService } from './services';

import { BcryptModule } from '@trxn/nestjs-bcrypt';
import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule, BcryptModule.register({})],
  providers: [PasswordService, HashService],
  exports: [PasswordService, HashService],
})
export class PasswordModule extends ConfigurableModuleClass {
  static createModule(module: DynamicModule): DynamicModule {
    // When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
    // Should remove this moduleOptions variables
    const moduleOptions = {
      ...module,
      module: ConfigurableModuleClass,
      exports: module.providers,
    };

    return {
      ...module,
      imports: [
        ...(module.imports || []),
        JwtModule.registerAsync({
          // When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
          // useFactory: (passwordModuleOptions: PasswordModuleOptions) =>
          // passwordModuleOptions?.jwtModuleOptions || {},
          // provideInjectionTokensFrom: module.providers,
          inject: [MODULE_OPTIONS_TOKEN],
          imports: [moduleOptions],
          useFactory: (passwordModuleOptions: PasswordModuleOptions) =>
            passwordModuleOptions?.jwtModuleOptions || {},
        }),
      ],
      exports: [...(module.exports || []), JwtModule],
    };
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const passwordOptionsModule = super.register(options);
    return this.createModule(passwordOptionsModule);
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const passwordOptionsModule = super.registerAsync(options);
    return this.createModule(passwordOptionsModule);
  }
}
