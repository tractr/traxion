import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AlertFeedbackResolver, AlertResolver } from './resolvers';

import { NestjsPubSubModule } from '@cali/nestjs-pub-sub';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    NestjsPubSubModule,
  ],
  providers: [AlertResolver, AlertFeedbackResolver],
})
export class GraphqlModule {}
