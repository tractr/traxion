import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_ALERT_EXCHANGE } from '../constants';
import { MessageBrokerAlert } from '../types';

import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerAlertService
  implements MessageBrokerService<MessageBrokerAlert>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<MessageBrokerAlert>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_ALERT_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
