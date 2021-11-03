import { Module } from '@nestjs/common';
import { LoggerModule } from '@tractr/nestjs-core';
import { DatabaseModule } from '@tractr/nestjs-database';

import { AppService } from './app.service';
import { SharedModule } from './shared.module';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { NestjsGraphqlModule } from '@cali/nestjs-graphql';
import { NestjsRestModule } from '@cali/nestjs-rest';

@Module({
  imports: [
    DatabaseModule.register(),
    NestjsRestModule,
    // ModelsModule.register(),
    SharedModule,
    LoggerModule,
    MessageBrokerAlertModule,
    NestjsGraphqlModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
