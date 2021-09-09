import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE } from '../constants';

import { MessageBrokerSubscribeParams } from '@cali/message-broker-common';

export const MessageBrokerCameraStatusSubscribe = (
  params: MessageBrokerSubscribeParams,
) =>
  RabbitSubscribe({
    ...params,
    exchange: MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
  });
