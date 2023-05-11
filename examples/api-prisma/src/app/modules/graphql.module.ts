import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { NestjsAuthorizedServicesModule } from './authorized-services.module';
import { DatabaseModule } from './database.module';
import { GraphqlModule } from '../../nestjs-authorized-resolvers';
import { CustomResolver } from '../resolvers/custom.resolver';

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
    GraphqlModule.register({
      imports: [NestjsAuthorizedServicesModule],
    }),
  ],
  providers: [CustomResolver],
  exports: [GraphqlModule],
})
export class NestjsGQLModule {}
