import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModelModule } from '../generated/nestjs-models-common';
import {
  AUTHENTICATION_OPTIONS,
  AuthenticationModuleOptionsFactory,
} from './config';
import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { LoginController } from './controllers';
import { AuthenticationOptions } from './interfaces';
import { AuthenticationService, StrategyOptionsService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

import {
  AsyncOptions,
  LoggerModule,
  ModuleOptionsFactory,
  ModuleOverrideMetadata,
} from '@tractr/nestjs-core';

@Module({})
export class AuthenticationModule extends ModuleOptionsFactory<
  AuthenticationOptions,
  Partial<AuthenticationOptions>,
  Omit<AuthenticationOptions, keyof Required<Partial<AuthenticationOptions>>>,
  AuthenticationModuleOptionsFactory
>(AUTHENTICATION_MODULE_OPTIONS, AUTHENTICATION_OPTIONS) {
  static register(
    {
      imports,
      providers,
      exports,
      controllers,
      dependencies,
      ...options
    }: Partial<AuthenticationOptions> &
      ModuleOverrideMetadata = AUTHENTICATION_OPTIONS,
    overrides: ModuleOverrideMetadata = {},
  ): DynamicModule {
    const moduleOptions = {
      ...AUTHENTICATION_OPTIONS,
      ...options,
    };

    const authenticationOptionsModule = super.register(moduleOptions);
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
      Partial<AuthenticationOptions>,
      Omit<
        AuthenticationOptions,
        keyof Required<Partial<AuthenticationOptions>>
      >,
      AuthenticationModuleOptionsFactory
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
        StrategyOptionsService,
        JwtStrategy,
        LocalStrategy,
      ],
      controllers: [LoginController],
    };
  }
}
