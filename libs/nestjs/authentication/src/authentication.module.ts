import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModelModule } from '../generated/nestjs-models-common';
import { AUTHENTICATION_OPTIONS } from './config';
import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { LoginController, PasswordController } from './controllers';
import {
  AuthenticationDefaultOptions,
  AuthenticationOptions,
  AuthenticationPublicOptions,
} from './interfaces';
import {
  AuthenticationService,
  PasswordService,
  StrategyOptionsService,
} from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

import {
  AsyncOptions,
  LoggerModule,
  ModuleOptionsFactory,
  ModuleOverrideMetadata,
} from '@tractr/nestjs-core';
import { MailerModule } from '@tractr/nestjs-mailer';

@Module({})
export class AuthenticationModule extends ModuleOptionsFactory<
  AuthenticationOptions,
  AuthenticationPublicOptions,
  AuthenticationDefaultOptions
>(AUTHENTICATION_MODULE_OPTIONS, AUTHENTICATION_OPTIONS) {
  static register(
    {
      imports,
      providers,
      exports,
      controllers,
      dependencies,
      ...options
    }: AuthenticationPublicOptions & ModuleOverrideMetadata,
    overrides: ModuleOverrideMetadata = {},
  ): DynamicModule {
    const authenticationOptionsModule = super.register(options);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
      {
        imports,
        providers,
        exports,
        controllers,
        dependencies,
        ...overrides,
      },
    );
  }

  static registerAsync(
    options: AsyncOptions<
      AuthenticationOptions,
      AuthenticationPublicOptions,
      AuthenticationDefaultOptions
    >,
    overrides: ModuleOverrideMetadata = {},
  ): DynamicModule {
    const authenticationOptionsModule = super.registerAsync(options);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
      overrides,
    );
  }

  private static createAuthenticationModuleFromOptions(
    authenticationOptionsModule: DynamicModule,
    overrides: ModuleOverrideMetadata,
  ): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [
        ...(authenticationOptionsModule.imports ?? []),
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
        UserModelModule.register(overrides),
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
        ...(authenticationOptionsModule.exports ?? []),
        AuthenticationService,
        JwtStrategy,
        LocalStrategy,
      ],
      providers: [
        ...(authenticationOptionsModule.providers ?? []),
        AuthenticationService,
        PasswordService,
        StrategyOptionsService,
        JwtStrategy,
        LocalStrategy,
      ],
      controllers: [LoginController, PasswordController],
    };
  }
}
