import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { MESSAGE_BROKER_VIDEO_GENERATION_EXCHANGE } from '../constants';

export const MessageBrokerVideoGenerationSubscribe = (
  params: Omit<Parameters<typeof RabbitSubscribe>[0], 'exchange'>,
) =>
  RabbitSubscribe({
    ...params,
    exchange: MESSAGE_BROKER_VIDEO_GENERATION_EXCHANGE,
  });
