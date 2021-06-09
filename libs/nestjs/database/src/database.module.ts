import { Global, Module } from '@nestjs/common';
import { LoggerModule, ModuleOptionsHelper } from '@tractr/nestjs-core';

import { PRISMA_OPTIONS } from './config';
import { PRISMA_MODULE_OPTIONS } from './constants';
import { DatabaseService, PrismaClientOptions } from './services';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule extends ModuleOptionsHelper<PrismaClientOptions>(
  PRISMA_MODULE_OPTIONS,
  PRISMA_OPTIONS,
) {}
