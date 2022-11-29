import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './authentication.module-definition';
import { LoginController } from './controllers';
import { AuthenticationModuleOptions } from './interfaces';
import {
  AuthenticationService,
  CookieOptionsService,
  HashService,
  StrategyOptionsService,
  UserAuthenticationService,
} from './services';
import { JwtOptionsService } from './services/jwt-options.service';
import { JwtStrategy, LocalStrategy } from './strategies';

import { BcryptModule } from '@trxn/nestjs-bcrypt';
import { LoggerModule } from '@trxn/nestjs-core';

@Module({})
export class AuthenticationModule extends ConfigurableModuleClass {
  private static createModule(module: DynamicModule): DynamicModule {
    // When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
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
        UserAuthenticationService,
      ],
      controllers: [LoginController],
    };
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const authenticationOptionsModule = super.register(options);
    return this.createModule(authenticationOptionsModule);
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const authenticationOptionsModule = super.registerAsync(options);
    return this.createModule(authenticationOptionsModule);
  }
}
