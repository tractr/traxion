import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AlertResolver, CameraResolver } from './resolvers';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerCameraStatusModule } from '@cali/message-broker-camera-status';

@Module({
  imports: [
    MessageBrokerAlertModule,
    MessageBrokerCameraStatusModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
  providers: [AlertResolver, CameraResolver],
  exports: [],
})
export class GraphqlModule {}
