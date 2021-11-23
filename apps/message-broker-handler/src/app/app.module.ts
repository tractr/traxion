import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { appConfiguration } from '../config';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';
import { MessageBrokerHandlerAlertFilterModule } from '@cali/message-broker-handler-alert-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
      cache: true,
    }),
    MessageBrokerHandlerAlertFilterModule.registerAsync({
      useFactory: (_, configService: ConfigService) =>
        configService.get<MessageBrokerConfiguration>('messageBroker', {
          infer: true,
        }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
