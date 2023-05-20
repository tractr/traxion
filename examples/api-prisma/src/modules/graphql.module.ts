import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { NestjsAuthorizedServicesModule } from './authorized-services.module';
import { DatabaseModule } from './database.module';
import { GraphqlModule as GraphqlResolversModule } from '../nestjs-graphql-authorized-resolvers';

@Module({
  imports: [
    DatabaseModule,
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    GraphqlResolversModule.register({
      imports: [NestjsAuthorizedServicesModule],
    }),
  ],
  exports: [GraphqlModule],
})
export class GraphqlModule {}
