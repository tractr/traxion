import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';

import { SENTRY_DEFAULT_OPTIONS } from './config';
import { SENTRY_MODULE_OPTIONS } from './constants';
import {
  SentryDefaultOptions,
  SentryModuleOptions,
  SentryPublicOptions,
} from './interfaces';
import { PrismaMiddleware } from './middlewares';
import { SentryLogger, SentryPerRequestLogger } from './services';

import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({})
export class SentryModule
  extends ModuleOptionsFactory<
    SentryModuleOptions,
    SentryPublicOptions,
    SentryDefaultOptions
  >(SENTRY_MODULE_OPTIONS, SENTRY_DEFAULT_OPTIONS)
  implements OnModuleInit
{
  static register(options: SentryPublicOptions): DynamicModule {
    const sentryOptionsModule: DynamicModule = super.register(options);
    return this.createSentryModuleFromOptions(sentryOptionsModule);
  }

  static registerAsync(
    options: AsyncOptions<
      SentryModuleOptions,
      SentryPublicOptions,
      SentryDefaultOptions
    >,
  ): DynamicModule {
    const sentryOptionsModule: DynamicModule = super.registerAsync(options);
    return this.createSentryModuleFromOptions(sentryOptionsModule);
  }

  private static createSentryModuleFromOptions(
    sentryOptionsModule: DynamicModule,
  ): DynamicModule {
    return {
      module: SentryModule,
      imports: [],
      providers: [
        ...(sentryOptionsModule.providers ?? []),
        SentryLogger,
        SentryPerRequestLogger,
        PrismaMiddleware,
      ],
      exports: [
        ...(sentryOptionsModule.exports ?? []),
        SentryLogger,
        SentryPerRequestLogger,
      ],
    };
  }

  constructor(private readonly prismaMiddleware: PrismaMiddleware) {
    super();
  }

  async onModuleInit() {
    this.prismaMiddleware.connectMiddlewareOnce();
  }
}
