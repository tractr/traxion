import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_USER_SERVICE,
} from './constants';
import {
  LoginController,
  PasswordController,
  TwoFactorAuthenticationController,
} from './controllers';
import { AuthenticationOptions } from './dtos';
import { AuthenticationPublicOptions } from './interfaces';
import {
  AuthenticationService,
  PasswordService,
  StrategyOptionsService,
  TwoFactorAuthenticationService,
} from './services';
import { AuthenticationUserService } from './services/authentication-user.service';
import { JwtStrategy, JwtTwoFactorStrategy, LocalStrategy } from './strategies';

import { transformAndValidate } from '@tractr/common';
import {
  AsyncOptions,
  LoggerModule,
  ModuleOptionsFactory,
} from '@tractr/nestjs-core';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({})
export class AuthenticationModule extends ModuleOptionsFactory<
  AuthenticationOptions,
  AuthenticationPublicOptions
>(AUTHENTICATION_MODULE_OPTIONS, transformAndValidate(AuthenticationOptions)) {
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
        MailerModule.registerAsync({
          imports: [authenticationOptionsModule],
          useFactory: (
            defaultOptions,
            authenticationOptions: AuthenticationOptions,
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
        ...(otp ? [TwoFactorAuthenticationService] : []),
        JwtStrategy,
        LocalStrategy,
        PasswordService,
        {
          provide: AUTHENTICATION_USER_SERVICE,
          useClass: AuthenticationUserService,
        },
      ],
      providers: [
        AuthenticationService,
        ...(otp ? [TwoFactorAuthenticationService] : []),
        PasswordService,
        StrategyOptionsService,
        JwtStrategy,
        ...(otp ? [JwtTwoFactorStrategy] : []),
        LocalStrategy,
        {
          provide: AUTHENTICATION_USER_SERVICE,
          useClass: AuthenticationUserService,
        },
      ],
      controllers: [
        LoginController,
        PasswordController,
        ...(otp ? [TwoFactorAuthenticationController] : []),
      ],
    };
  }
}
