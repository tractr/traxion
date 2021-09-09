import { Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { AppService } from './app.service';
import { SharedModule } from './shared.module';

import { ModelsModule } from '@cali/generated/nestjs-models';
import { MessageBrokerAlertModule } from '@cali/message-broker-alert';

@Module({
  imports: [
    DatabaseModule.register(),
    ModelsModule.register(),
    SharedModule,
    LoggerModule,
    MessageBrokerAlertModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
