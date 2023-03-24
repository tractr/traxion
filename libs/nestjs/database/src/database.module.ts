import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './database.module-definition';
import { getDefaultPrismaClient } from './factories';
import {
  ManagedPrismaClientsService,
  MysqlService,
  PostgresqlService,
  PrismaService,
} from './services';
import { DatabaseService } from './services/database.service';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule],
  providers: [
    MysqlService,
    PostgresqlService,
    ManagedPrismaClientsService,
    {
      provide: PrismaService,
      useFactory: getDefaultPrismaClient,
      inject: [ManagedPrismaClientsService],
    },

    {
      provide: DatabaseService,
      useFactory: getDefaultPrismaClient,
      inject: [ManagedPrismaClientsService],
    },
  ],
  exports: [
    PrismaService,
    DatabaseService,
    MysqlService,
    PostgresqlService,
    ManagedPrismaClientsService,
  ],
})
export class DatabaseModule extends ConfigurableModuleClass {}
