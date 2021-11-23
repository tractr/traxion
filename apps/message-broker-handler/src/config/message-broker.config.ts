import { AppEnvironmentVariables } from '../dtos';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';

export const messageBrokerConfiguration = ({
  MESSAGE_BROKER_URL,
  MESSAGE_BROKER_USER,
  MESSAGE_BROKER_PASSWORD,
}: AppEnvironmentVariables): MessageBrokerConfiguration => ({
  url: MESSAGE_BROKER_URL,
  user: MESSAGE_BROKER_USER,
  password: MESSAGE_BROKER_PASSWORD,
});
