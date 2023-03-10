import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { NestjsServicesModule } from './services.module';
import { GraphqlModule } from '../../nestjs-resolvers';

@Module({
  imports: [
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphqlModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    GraphqlModule.register({
      imports: [NestjsServicesModule],
    }),
  ],
  exports: [GraphqlModule],
})
export class NestjsGraphqlModule {}