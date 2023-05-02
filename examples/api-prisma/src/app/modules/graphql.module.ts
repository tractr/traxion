import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './database.module';
import { GraphqlModule } from '../../nestjs-authorized-resolvers';
import { AuthorizedServicesModules } from '../../nestjs-authorized-services';
import { CustomResolver } from '../resolvers/custom.resolver';

@Module({
  imports: [
    DatabaseModule,
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphqlModule, NestjsGQLModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    GraphqlModule.register({
      imports: [AuthorizedServicesModules],
    }),
  ],
  providers: [CustomResolver],
  exports: [GraphqlModule],
})
export class NestjsGQLModule {}
