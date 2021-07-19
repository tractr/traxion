import { Global, Module } from '@nestjs/common';

import { PRISMA_OPTIONS } from './config';
import { PRISMA_MODULE_OPTIONS } from './constants';
import {
  DatabaseService,
  MysqlService,
  PostgresqlService,
  PrismaClientOptions,
} from './services';

import { LoggerModule, ModuleOptionsFactory } from '@tractr/nestjs-core';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [DatabaseService, MysqlService, PostgresqlService],
  exports: [DatabaseService, MysqlService, PostgresqlService],
})
export class DatabaseModule extends ModuleOptionsFactory<PrismaClientOptions>(
  PRISMA_MODULE_OPTIONS,
  PRISMA_OPTIONS,
) {}
