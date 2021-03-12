import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AsyncOptions,
  CoreModule,
  ModuleOptionsHelper,
  ModuleOverrideMetadata,
} from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { UserModelModule, UserModelModule } from '../generated/user/common';
import {
  AUTHENTICATION_OPTIONS,
  AuthenticationModuleOptionsFactory,
} from './config';
import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { LoginController } from './controllers';
import { AuthenticationOptions } from './interfaces';
import { AuthenticationService, StrategyOptionsService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({})
export class AuthenticationModule extends ModuleOptionsHelper<AuthenticationOptions>(
  AUTHENTICATION_MODULE_OPTIONS,
  AUTHENTICATION_OPTIONS,
) {
  static register(
    options: AuthenticationOptions = AUTHENTICATION_OPTIONS,
    overrides: ModuleOverrideMetadata = {},
  ): DynamicModule {
    const moduleOptions = {
      ...AUTHENTICATION_OPTIONS,
      ...options,
    };

    const authenticationOptionsModule = super.register(moduleOptions);
    return this.createAuthenticationModuleFromOptions(
      authenticationOptionsModule,
      overrides,
    );
  }

  static registerAsync(
    options: AsyncOptions<AuthenticationOptions> = {
      useClass: AuthenticationModuleOptionsFactory,
    },
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
        DatabaseModule,
        CoreModule,
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
