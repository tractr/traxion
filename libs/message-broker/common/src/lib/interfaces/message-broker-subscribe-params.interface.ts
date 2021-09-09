import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

export type MessageBrokerSubscribeParams = Omit<
  Parameters<typeof RabbitSubscribe>[0],
  'exchange'
>;
