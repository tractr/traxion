import { Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { GraphqlModule } from '@cali/nestjs-graphql';
import { MessageBrokerModule } from '@cali/nestjs-message-broker';
import { RestModule } from '@cali/nestjs-rest';

@Module({
  imports: [
    // Common modules
    LoggerModule,
    DatabaseModule.register(),

    // Network modules
    RestModule,
    GraphqlModule,
    MessageBrokerModule.register({
      url: 'amqp://localhost:5672',
    }),
  ],
  controllers: [],
})
export class AppModule {}
