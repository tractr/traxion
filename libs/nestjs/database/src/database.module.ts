import { Module } from '@nestjs/common';

import { DATABASE_SERVICE } from './constants';
import { ConfigurableModuleClass } from './database.module-definition';
import {
  ManagePrismaClientService,
  MysqlService,
  PostgresqlService,
} from './services';

import { LoggerModule } from '@trxn/nestjs-core';

@Module({
  imports: [LoggerModule],
  providers: [
    ManagePrismaClientService,
    {
      provide: DATABASE_SERVICE,
      useFactory: (managePrismaClientService: ManagePrismaClientService) =>
        managePrismaClientService.prismaClient,
      inject: [ManagePrismaClientService],
    },
    MysqlService,
    PostgresqlService,
  ],
  exports: [DATABASE_SERVICE, MysqlService, PostgresqlService],
})
export class DatabaseModule extends ConfigurableModuleClass {}
