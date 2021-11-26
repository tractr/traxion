import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import {
  AlertService,
  FramePerformanceService,
  VideoGenerationService,
} from './services';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerPredictionLogModule } from '@cali/message-broker-prediction-log';
import { MessageBrokerVideoGenerationModule } from '@cali/message-broker-video-generation';

@Module({
  imports: [
    ConsoleModule,
    MessageBrokerAlertModule.register({
      url: 'amqp://localhost:5672',
      user: 'guest',
      password: 'guest',
    }),
    MessageBrokerPredictionLogModule.register({
      url: 'amqp://localhost:5672',
      user: 'guest',
      password: 'guest',
    }),
    MessageBrokerVideoGenerationModule.register({
      url: 'amqp://localhost:5672',
      user: 'guest',
      password: 'guest',
    }),
  ],
  providers: [AlertService, FramePerformanceService, VideoGenerationService],
})
export class CliModule {}
