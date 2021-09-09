import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE } from './constants';
import { MessageBrokerFramePerformanceService } from './services';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE,
          type: 'fanout',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: true },
    }),
  ],
  controllers: [],
  providers: [MessageBrokerFramePerformanceService],
  exports: [MessageBrokerFramePerformanceService],
})
export class MessageBrokerFramePerformanceModule {}
