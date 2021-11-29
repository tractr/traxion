import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from './constants';
import { LoginController, PasswordController } from './controllers';
import { AuthenticationModuleOptions } from './dtos';
import { AuthenticationPublicOptions } from './interfaces';
import {
  AuthenticationService,
  PasswordService,
  StrategyOptionsService,
} from './services';
import { AuthenticationUserService } from './services/authentication-user.service';
import { JwtStrategy, LocalStrategy } from './strategies';

import { transformAndValidate } from '@tractr/common';
import {
  AsyncOptions,
  LoggerModule,
  ModuleOptionsFactory,
} from '@tractr/nestjs-core';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({})
export class AuthenticationModule extends ModuleOptionsFactory<
  AuthenticationModuleOptions,
  AuthenticationPublicOptions
>(
  AUTHENTICATION_MODULE_OPTIONS,
  transformAndValidate(AuthenticationModuleOptions),
) {
  static register(options: AuthenticationPublicOptions): DynamicModule {
    const authenticationOptionsModule = super.register(options);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
    );
  }

  static registerAsync(
    options: AsyncOptions<
      AuthenticationModuleOptions,
      AuthenticationPublicOptions
    >,
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
          useFactory: (authenticationOptions: AuthenticationModuleOptions) =>
            authenticationOptions.jwtModuleOptions,
          inject: [AUTHENTICATION_MODULE_OPTIONS],
        }),
        PassportModule.registerAsync({
          imports: [authenticationOptionsModule],
          useFactory: (authenticationOptions: AuthenticationModuleOptions) =>
            authenticationOptions.passportModuleOptions,
          inject: [AUTHENTICATION_MODULE_OPTIONS],
        }),
        MailerModule.registerAsync({
          imports: [authenticationOptionsModule],
          useFactory: (
            defaultOptions,
            authenticationOptions: AuthenticationModuleOptions,
          ) => {
            const { active } = authenticationOptions.password.reset;

            if (!active)
              return {
                ...defaultOptions,
                privateApiKey: 'not active',
                publicApiKey: 'not active',
              };

            if (!authenticationOptions.mailer)
              throw new Error(
                'password reset is activated. You must configure the mailer module options',
              );

            return {
              ...defaultOptions,
              ...authenticationOptions.mailer.moduleOptions,
            };
          },
          inject: [AUTHENTICATION_MODULE_OPTIONS],
        }),
      ],
      exports: [
        AuthenticationService,
        JwtStrategy,
        LocalStrategy,
        PasswordService,
      ],
      providers: [
        AuthenticationService,
        PasswordService,
        StrategyOptionsService,
        JwtStrategy,
        LocalStrategy,
        {
          provide: AUTHENTICATION_USER_SERVICE,
          useClass: AuthenticationUserService,
        },
      ],
      controllers: [LoginController, PasswordController],
    };
  }
}
