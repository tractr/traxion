import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { GraphqlModule } from './nestjs-resolvers';
import { ServicesModule } from './services.module';

@Module({
  imports: [
    GraphqlModule.register({
      imports: [ServicesModule],
    }),
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      persistedQueries: false,
    }),
  ],
  exports: [NestjsGraphQLModule, GraphqlModule],
})
export class GraphQLModule {}
