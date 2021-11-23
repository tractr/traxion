import { transformAndValidate } from '@tractr/common';

import { AppEnvironmentVariables } from '../dtos';
import { messageBrokerConfiguration } from './message-broker.config';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';

export interface AppConfiguration {
  messageBroker: MessageBrokerConfiguration;
}

export const appConfiguration = (): AppConfiguration => {
  let app;

  try {
    app = transformAndValidate(AppEnvironmentVariables)(
      process.env as unknown as AppEnvironmentVariables,
    );
  } catch (e) {
    console.error(
      'Fail to start the application, environment variables missing',
    );
    console.error(e);
    throw e;
  }

  return {
    messageBroker: messageBrokerConfiguration(app),
  };
};
