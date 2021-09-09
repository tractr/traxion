import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { MESSAGE_BROKER_ALERT_EXCHANGE } from './constants';
import { MessageBrokerAlertService } from './services';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: MESSAGE_BROKER_ALERT_EXCHANGE,
          type: 'fanout',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: true },
    }),
  ],
  controllers: [],
  providers: [MessageBrokerAlertService],
  exports: [MessageBrokerAlertService],
})
export class MessageBrokerAlertModule {}
