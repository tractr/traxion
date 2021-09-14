import { Module } from '@nestjs/common';

import { CameraMonitoringService } from './services';

import { MessageBrokerCameraStatusModule } from '@cali/message-broker-camera-status';
import { MessageBrokerFramePerformanceModule } from '@cali/message-broker-frame-performance';

@Module({
  imports: [
    MessageBrokerFramePerformanceModule,
    MessageBrokerCameraStatusModule,
  ],
  controllers: [],
  providers: [CameraMonitoringService],
  exports: [],
})
export class CameraMonitoringModule {}
