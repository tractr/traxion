import { ModuleWithProviders, NgModule } from '@angular/core';
import { InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/angular-tools';
import { transformAndValidate } from '@tractr/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { OperationDefinitionNode } from 'graphql';

import { GRAPHQL_CLIENT_CONFIGURATION } from './constants/graphql-client-configuration.constant';
import { GraphqlClientConfiguration } from './dtos/graphql-client-configuration.dto';
import { AlertCreatedGql, AlertUpdatedGql } from './services';

@NgModule({
  providers: [
    AlertCreatedGql,
    AlertUpdatedGql,
    {
      provide: APOLLO_OPTIONS,
      useFactory(
        httpLink: HttpLink,
        configuration: GraphqlClientConfiguration,
      ) {
        // Create an http link:
        const http = httpLink.create({
          uri: configuration.httpUri,
        });

        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: configuration.wsUri,
          options: {
            reconnect: true,
          },
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const { kind, operation } = getMainDefinition(
              query,
            ) as OperationDefinitionNode;
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          ws,
          http,
        );

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink, GRAPHQL_CLIENT_CONFIGURATION],
    },
  ],
})
export class AngularGraphqlClientModule extends ModuleOptionsFactory<GraphqlClientConfiguration>(
  GRAPHQL_CLIENT_CONFIGURATION,
  transformAndValidate(GraphqlClientConfiguration),
) {
  static register(
    options: GraphqlClientConfiguration,
  ): ModuleWithProviders<AngularGraphqlClientModule> {
    return super.register(options);
  }

  static forRoot(
    options: GraphqlClientConfiguration,
  ): ModuleWithProviders<AngularGraphqlClientModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<GraphqlClientConfiguration>,
  ): ModuleWithProviders<AngularGraphqlClientModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<GraphqlClientConfiguration>,
  ): ModuleWithProviders<AngularGraphqlClientModule> {
    return super.forRootAsync(options);
  }
}
