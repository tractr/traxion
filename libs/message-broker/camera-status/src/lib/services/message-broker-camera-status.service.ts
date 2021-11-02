import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE } from '../constants';
import { MessageBrokerCameraStatus } from '../types';

import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerCameraStatusService
  implements MessageBrokerService<MessageBrokerCameraStatus>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<MessageBrokerCameraStatus>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
