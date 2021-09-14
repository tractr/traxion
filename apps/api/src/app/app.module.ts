import { Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { AppService } from './app.service';
import { SharedModule } from './shared.module';

import { CameraMonitoringModule } from '@cali/camera-monitoring';
import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { ModelsModule } from '@generated/nestjs-models';

@Module({
  imports: [
    DatabaseModule.register(),
    ModelsModule.register(),
    SharedModule,
    LoggerModule,
    MessageBrokerAlertModule,
    CameraMonitoringModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
