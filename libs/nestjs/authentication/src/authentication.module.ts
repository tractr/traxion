import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './authentication.module-definition';
import { LoginController } from './controllers';
import { UnauthorizedExceptionFilter } from './filters';
import { AuthenticationModuleOptions } from './interfaces';
import {
  AuthenticationService,
  CookieOptionsService,
  HashService,
  StrategyOptionsService,
} from './services';
import { JwtOptionsService } from './services/jwt-options.service';
import { JwtStrategy, LocalStrategy } from './strategies';

import { BcryptModule } from '@trxn/nestjs-bcrypt';
import { LoggerModule } from '@trxn/nestjs-core';

@Module({})
export class AuthenticationModule extends ConfigurableModuleClass {
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  private static createModule(module: DynamicModule): DynamicModule {
    // FIXME: When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
    // Should remove this moduleOptions variables
    const moduleOptions = {
      ...module,
      module: ConfigurableModuleClass,
      providers: [...(module.providers || []), JwtOptionsService],
      exports: [...(module.providers || []), JwtOptionsService],
    };

    return {
      ...module,
      imports: [
        ...(module.imports || []),
        BcryptModule.register({}),
        LoggerModule,
        JwtModule.registerAsync({
          // FIXME: When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
          // useFactory: (passwordModuleOptions: PasswordModuleOptions) =>
          // passwordModuleOptions?.jwtModuleOptions || {},
          // provideInjectionTokensFrom: module.providers,
          imports: [moduleOptions],
          useFactory: (jwtOptionsService: JwtOptionsService) =>
            jwtOptionsService.jwtModuleOptions,
          inject: [JwtOptionsService],
        }),
        PassportModule.registerAsync({
          imports: [moduleOptions],
          useFactory: (authenticationOptions: AuthenticationModuleOptions) =>
            authenticationOptions.passportModuleOptions || {},
          inject: [MODULE_OPTIONS_TOKEN],
        }),
      ],
      exports: [
        ...(module.exports || []),
        AuthenticationService,
        JwtStrategy,
        StrategyOptionsService,
        CookieOptionsService,
        JwtOptionsService,
        LocalStrategy,
      ],
      providers: [
        ...(module.providers || []),
        AuthenticationService,
        StrategyOptionsService,
        CookieOptionsService,
        JwtOptionsService,
        LocalStrategy,
        JwtStrategy,
        HashService,
        {
          provide: APP_FILTER,
          useClass: UnauthorizedExceptionFilter,
        },
      ],
      controllers: [LoginController],
    };
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const authenticationOptionsModule = super.register(options);
    return this.createModule(authenticationOptionsModule);
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const authenticationOptionsModule = super.registerAsync(options);
    return this.createModule(authenticationOptionsModule);
  }
}
