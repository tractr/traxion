import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE } from '../constants';

import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';
import { CameraStatus } from '@generated/models';

export type CameraStatusChangeNotification = {
  idcamera: number;
  status: CameraStatus;
};

@Injectable()
export class MessageBrokerCameraStatusService
  implements MessageBrokerService<CameraStatusChangeNotification>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<CameraStatusChangeNotification>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
