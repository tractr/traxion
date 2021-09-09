import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { MESSAGE_BROKER_ALERT_EXCHANGE } from '../constants';

import { MessageBrokerSubscribeParams } from '@cali/message-broker-common';

export const MessageBrokerAlertSubscribe = (
  params: MessageBrokerSubscribeParams,
) => RabbitSubscribe({ ...params, exchange: MESSAGE_BROKER_ALERT_EXCHANGE });
