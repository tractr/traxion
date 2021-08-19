import { Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { SharedModule } from './shared.module';

import { ModelsModule } from '@cali/generated/nestjs-models';

@Module({
  imports: [
    DatabaseModule.register(),
    ModelsModule.register(),
    SharedModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
