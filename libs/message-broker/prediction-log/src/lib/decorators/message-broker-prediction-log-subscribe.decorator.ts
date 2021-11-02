import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE } from '../constants';

export const MessageBrokerPredictionLogSubscribe = (
  params: Omit<Parameters<typeof RabbitSubscribe>[0], 'exchange'>,
) =>
  RabbitSubscribe({
    ...params,
    exchange: MESSAGE_BROKER_PREDICTION_LOG_EXCHANGE,
  });
