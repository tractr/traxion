import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE } from './constants';
import { MessageBrokerCameraStatusService } from './services';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: MESSAGE_BROKER_CAMERA_STATUS_EXCHANGE,
          type: 'fanout',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: true },
    }),
  ],
  controllers: [],
  providers: [MessageBrokerCameraStatusService],
  exports: [MessageBrokerCameraStatusService],
})
export class MessageBrokerCameraStatusModule {}
