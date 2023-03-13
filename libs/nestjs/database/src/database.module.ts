import { Logger, LoggerService, Module } from '@nestjs/common';

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
      useFactory: (
        managePrismaClientService: ManagedPrismaClientsService,
        logger: LoggerService,
      ) => {
        logger.warn(
          'DatabaseService token is deprecated. Use PrismaService from @trxn/nestjs-database instead.',
        );
        return getDefaultPrismaClient(managePrismaClientService);
      },
      inject: [ManagedPrismaClientsService, Logger],
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
