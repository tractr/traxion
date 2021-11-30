import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@tractr/nestjs-database';

import { appConfiguration } from '../config';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';
import { GraphqlModule } from '@cali/nestjs-graphql';
import { NestjsLoggerModule } from '@cali/nestjs-logger';
import { MessageBrokerModule } from '@cali/nestjs-message-broker';
import { RestModule } from '@cali/nestjs-rest';

@Module({
  imports: [
    // Common modules
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
      cache: true,
    }),
    NestjsLoggerModule,
    DatabaseModule.register(),

    // Network modules
    RestModule,
    GraphqlModule,
    MessageBrokerModule.registerAsync({
      useFactory: (_, configService: ConfigService) =>
        configService.get<MessageBrokerConfiguration>('messageBroker', {
          infer: true,
        }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
