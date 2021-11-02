import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE } from '../constants';
import { MessageBrokerPredictionLog } from '../types';

import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerPredictionLogService
  implements MessageBrokerService<MessageBrokerPredictionLog>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<MessageBrokerPredictionLog>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
