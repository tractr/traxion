import {
  FactoryProvider,
  Global,
  Logger,
  LoggerService,
  Module,
  Scope,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

import { LoggerModule, PrismaExceptionInterceptor } from '@trxn/nestjs-core';
import {
  DatabaseService,
  ManagedPrismaClientsService,
  PrismaClients,
  PrismaService,
  DatabaseModule as TraxionDatabaseModule,
} from '@trxn/nestjs-database';

const prismaClient: PrismaClients = {
  default: new PrismaClient(),
  vyv: new PrismaClient({
    datasources: {
      db: {
        url: process.env.VYV_DATABASE_URL,
      },
    },
  }),
};

const useFactory = (
  managePrismaClientService: ManagedPrismaClientsService,
  logger: LoggerService,
): PrismaClient => {
  logger.warn('Use factory for Database service by request');

  return managePrismaClientService.prismaClients.default;
};
export const CustomPrismaService: FactoryProvider = {
  provide: PrismaService,
  useFactory,
  inject: [ManagedPrismaClientsService, Logger],
  scope: Scope.REQUEST,
};

export const CustomDatabaseService: FactoryProvider = {
  provide: DatabaseService,
  useFactory,
  inject: [ManagedPrismaClientsService, Logger],
  scope: Scope.REQUEST,
};

@Global()
@Module({
  imports: [
    LoggerModule,
    TraxionDatabaseModule.register({
      prismaClient,
    }),
  ],
  exports: [PrismaService, DatabaseService],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PrismaExceptionInterceptor },
    CustomPrismaService,
    CustomDatabaseService,
  ],
})
export class DatabaseModule {}
