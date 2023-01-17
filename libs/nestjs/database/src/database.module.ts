import { DynamicModule, Global, Module } from '@nestjs/common';

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './database.module-definition';
import {
  DatabaseService,
  MysqlService,
  PostgresqlService,
  PrismaClientOptions,
} from './services';

import { LoggerModule } from '@trxn/nestjs-core';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [DatabaseService, MysqlService, PostgresqlService],
  exports: [DatabaseService, MysqlService, PostgresqlService],
})
export class DatabaseModule extends ConfigurableModuleClass {
  static createModule(module: DynamicModule): DynamicModule {
    // When https://github.com/nestjs/jwt/pull/1065 is merged, this can be simplified to:
    // Should remove this moduleOptions variables
    const moduleOptions = {
      ...module,
      module: ConfigurableModuleClass,
      exports: module.providers,
    };

    return {
      ...module,
      imports: [...(module.imports || [])],
      exports: [...(module.exports || [])],
      controllers: [...(module.controllers || [])],
    };
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const databaseOptionsModule = super.register(options);
    return this.createModule(databaseOptionsModule);
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const databaseOptionsModule = super.registerAsync(options);
    return this.createModule(databaseOptionsModule);
  }
}
