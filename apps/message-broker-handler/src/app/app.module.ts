import { Module } from '@nestjs/common';

import { MessageBrokerHandlerAlertFilterModule } from '@cali/message-broker-handler-alert-filter';

@Module({
  imports: [
    MessageBrokerHandlerAlertFilterModule.register({
      url: 'amqp://localhost:5672',
    }),
  ],
})
export class AppModule {}
