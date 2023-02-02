import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

import { PrismaExceptionInterceptor } from '@trxn/nestjs-core';
import { DatabaseModule as TraxionDatabaseModule } from '@trxn/nestjs-database';

@Module({
  imports: [
    TraxionDatabaseModule.register({
      // prismaClient: new PrismaClient(),
    }),
  ],
  exports: [TraxionDatabaseModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PrismaExceptionInterceptor },
  ],
})
export class DatabaseModule {}
