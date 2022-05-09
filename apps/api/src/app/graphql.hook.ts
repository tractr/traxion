import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContextValidationDidStart,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class GraphQLHook implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener> {
    console.info('Request started');
    return {
      async validationDidStart({
        operationName,
      }: GraphQLRequestContextValidationDidStart<BaseContext>) {
        console.info('Validation started', operationName);
        return async (...errors) => {
          if (errors.length) {
            console.info('ERRORS');
            console.info(JSON.stringify(errors, null, 2));
          }
          console.info('requestDidStart');
        };
      },
      async willSendResponse() {
        console.info('Will send response');
      },
    };
  }
}
