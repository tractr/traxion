import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from './constants';
import { LoginController } from './controllers';
import { AuthenticationOptions } from './dtos';
import { AuthenticationPublicOptions } from './interfaces';
import { AuthenticationService, StrategyOptionsService } from './services';
import { AuthenticationUserService } from './services/authentication-user.service';
import { JwtStrategy, LocalStrategy } from './strategies';

import {
  AsyncOptions,
  LoggerModule,
  ModuleOptionsFactory,
} from '@tractr/nestjs-core';

@Module({})
export class AuthenticationModule extends ModuleOptionsFactory<
  AuthenticationOptions,
  AuthenticationPublicOptions
>(AUTHENTICATION_MODULE_OPTIONS, AuthenticationOptions) {
  static register(options: AuthenticationPublicOptions): DynamicModule {
    const authenticationOptionsModule = super.register(options);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
    );
  }

  static registerAsync(
    options: AsyncOptions<AuthenticationOptions, AuthenticationPublicOptions>,
  ): DynamicModule {
    const authenticationOptionsModule = super.registerAsync(options);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
    );
  }

  private static createAuthenticationModuleFromOptions(
    authenticationOptionsModule: DynamicModule,
  ): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [
        authenticationOptionsModule,
        LoggerModule,
        JwtModule.registerAsync({
          imports: [authenticationOptionsModule],
          useFactory: (authenticationOptions: AuthenticationOptions) =>
            authenticationOptions.jwtModuleOptions,
          inject: [AUTHENTICATION_MODULE_OPTIONS],
        }),
        PassportModule.registerAsync({
          imports: [authenticationOptionsModule],
          useFactory: (authenticationOptions: AuthenticationOptions) =>
            authenticationOptions.passportModuleOptions,
          inject: [AUTHENTICATION_MODULE_OPTIONS],
        }),
      ],
      exports: [
        AuthenticationService,
        JwtStrategy,
        LocalStrategy,
        {
          provide: AUTHENTICATION_USER_SERVICE,
          useClass: AuthenticationUserService,
        },
      ],
      providers: [
        AuthenticationService,
        StrategyOptionsService,
        JwtStrategy,
        LocalStrategy,
        {
          provide: AUTHENTICATION_USER_SERVICE,
          useClass: AuthenticationUserService,
        },
      ],
      controllers: [LoginController],
    };
  }
}
