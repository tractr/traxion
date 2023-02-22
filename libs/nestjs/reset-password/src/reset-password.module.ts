import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ResetPasswordModuleOptions } from './interfaces';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './reset-password.module-definition';
import { ResetPasswordService } from './services';

import { BcryptModule } from '@trxn/nestjs-bcrypt';
import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule, BcryptModule.register({})],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule extends ConfigurableModuleClass {
  static createModule(module: DynamicModule): DynamicModule {
    // FIXME: When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
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
          // FIXME: When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
          // useFactory: (passwordModuleOptions: PasswordModuleOptions) =>
          // passwordModuleOptions?.jwtModuleOptions || {},
          // provideInjectionTokensFrom: module.providers,
          inject: [MODULE_OPTIONS_TOKEN],
          imports: [moduleOptions],
          useFactory: (passwordModuleOptions: ResetPasswordModuleOptions) =>
            passwordModuleOptions?.jwtModuleOptions || {},
        }),
      ],
      exports: [...(module.exports || []), JwtModule],
    };
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const resetPasswordOptionsModule = super.register(options);
    return this.createModule(resetPasswordOptionsModule);
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const resetPasswordOptionsModule = super.registerAsync(options);
    return this.createModule(resetPasswordOptionsModule);
  }
}
