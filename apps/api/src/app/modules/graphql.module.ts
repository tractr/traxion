import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { GraphQLModelsModule } from '@tractr/generated-nestjs-graphql';

@Module({
  imports: [
    GraphQLModelsModule,
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphQLModelsModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
    }),
  ],
  exports: [GraphQLModelsModule, GraphQLModule],
})
export class GraphQLModule {}
