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

const {
  MESSAGE_BROKER_DOMAIN: domain,
  MESSAGE_BROKER_PORT: port,
  MESSAGE_BROKER_PROTOCOL: protocol,
  MESSAGE_BROKER_USER: user,
  MESSAGE_BROKER_PASSWORD: password,
} = process.env;

const messageBrokerConfiguration = {
  domain,
  port,
  protocol,
  user,
  password,
};

@Module({
  imports: [
    ConsoleModule,
    MessageBrokerAlertModule.register(messageBrokerConfiguration),
    MessageBrokerPredictionLogModule.register(messageBrokerConfiguration),
    MessageBrokerVideoGenerationModule.register(messageBrokerConfiguration),
  ],
  providers: [AlertService, FramePerformanceService, VideoGenerationService],
})
export class CliModule {}
