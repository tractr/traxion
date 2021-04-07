import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule, PrismaExceptionFilter } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { AppController } from './controllers';
import { ModelsModule } from './generated';

@Module({
  imports: [LoggerModule, DatabaseModule.register(), ModelsModule.register()],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: PrismaExceptionFilter }],
})
export class AppModule {}
