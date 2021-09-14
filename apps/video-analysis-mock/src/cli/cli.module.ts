import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { AlertService, FramePerformanceService } from './services';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerFramePerformanceModule } from '@cali/message-broker-frame-performance';

@Module({
  imports: [
    ConsoleModule,
    MessageBrokerAlertModule,
    MessageBrokerFramePerformanceModule,
  ],
  providers: [AlertService, FramePerformanceService],
})
export class CliModule {}
