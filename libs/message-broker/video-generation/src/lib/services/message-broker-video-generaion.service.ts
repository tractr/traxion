import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_VIDEO_GENERATION_EXCHANGE } from '../constants';
import { MessageBrokerVideoGeneration } from '../types';

import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerVideoGenerationService
  implements MessageBrokerService<MessageBrokerVideoGeneration>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<MessageBrokerVideoGeneration>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_VIDEO_GENERATION_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
