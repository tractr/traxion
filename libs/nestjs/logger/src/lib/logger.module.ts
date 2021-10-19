import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';

import { LOGGER_CONFIGURATION_TOKEN, LOGGER_SERVICE } from './constants';

import { ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (loggerConfiguration: WinstonModuleOptions) =>
        loggerConfiguration,
      inject: [LOGGER_CONFIGURATION_TOKEN],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule extends ModuleOptionsFactory<WinstonModuleOptions>(
  LOGGER_CONFIGURATION_TOKEN,
) {}
