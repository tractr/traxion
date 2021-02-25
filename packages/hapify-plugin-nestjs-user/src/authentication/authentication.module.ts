import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AsyncOptions,
  CoreModule,
  ModuleOptionsHelper,
  ModuleOverrideMetadata,
} from '@tractr/hapify-plugin-nestjs-core';
import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';

import { UserModelModule } from '../generated/user';
import {
  AUTHENTICATION_OPTIONS,
  AuthenticationModuleOptionsFactory,
} from './config';
import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { LoginController } from './controllers';
import { JwtAuthGuard } from './guards';
import { AuthenticationOptions } from './interfaces';
import { AuthenticationService, StrategyOptionsService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({})
export class AuthenticationModule extends ModuleOptionsHelper<AuthenticationOptions>() {
  static moduleOptionsProvide = AUTHENTICATION_MODULE_OPTIONS;

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
        // { provide: APP_GUARD, useClass: JwtAuthGuard },
        AuthenticationService,
        StrategyOptionsService,
        JwtStrategy,
        LocalStrategy,
      ],
      controllers: [LoginController],
    };
  }
}

// const {
//   models,
//   jwtModuleAsyncOptions,
//   passportModuleOptions,
//   ...options
// }: AuthenticationModuleOptions = {
//   models: UserModelModule,
//   authenticationOptions: {},
//   jwtModuleAsyncOptions: {
//     useClass: JwtConfigService,
//   },
//   passportModuleOptions: {
//     useClass: PassportAuthOptionsFactory,
//   },
//   ...moduleOptions,
// };

// const passportModule = PassportModule.registerAsync(passportModuleOptions);
// const jwtModule = JwtModule.registerAsync(jwtModuleAsyncOptions);
// return {
//   module: AuthenticationModule,
//   imports: [
//     DatabaseModule,
//     LogModule,
//     jwtModule,
//     passportModule,
//     models.register(options),
//   ],
//   exports: [AuthenticationService, JwtStrategy, LocalStrategy],
//   providers: [
//     { provide: APP_GUARD, useClass: JwtAuthGuard },
//     AuthenticationService,
//     ...(jwtModule.providers ?? []),
//     ...(passportModule.providers ?? []),
//     StrategyOptionsService,
//     JwtStrategy,
//     LocalStrategy,
//     UserCustomService,
//   ],
//   controllers: [LoginController],
// };
