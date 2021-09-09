import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE } from '../constants';

export const MessageBrokerFramePerformanceSubscribe = (
  params: Omit<Parameters<typeof RabbitSubscribe>[0], 'exchange'>,
) =>
  RabbitSubscribe({
    ...params,
    exchange: MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE,
  });
