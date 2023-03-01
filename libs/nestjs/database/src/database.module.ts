import { Logger, LoggerService, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './database.module-definition';
import { getDefaultPrismaClient } from './factories';
import {
  ManagePrismaClientsService,
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
    ManagePrismaClientsService,
    {
      provide: PrismaService,
      useFactory: getDefaultPrismaClient,
      inject: [ManagePrismaClientsService],
    },

    {
      provide: DatabaseService,
      useFactory: (
        managePrismaClientService: ManagePrismaClientsService,
        logger: LoggerService,
      ) => {
        logger.warn(
          'DatabaseService token is deprecated. Use PrismaService from @trxn/nestjs-database instead.',
        );
        return getDefaultPrismaClient(managePrismaClientService);
      },
      inject: [ManagePrismaClientsService, Logger],
    },
  ],
  exports: [PrismaService, DatabaseService, MysqlService, PostgresqlService],
})
export class DatabaseModule extends ConfigurableModuleClass {}
