import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaExceptionInterceptor } from '@trxn/nestjs-core';
import { DatabaseModule as TraxionDatabaseModule } from '@trxn/nestjs-database';

@Global()
@Module({
  imports: [TraxionDatabaseModule.register({})],
  exports: [TraxionDatabaseModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PrismaExceptionInterceptor },
  ],
})
export class DatabaseModule {}
