import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_ALERT_EXCHANGE } from '../constants';

import { RawAlert } from '@cali/common';
import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerAlertService
  implements MessageBrokerService<RawAlert>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<RawAlert>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_ALERT_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
