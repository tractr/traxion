import { AppEnvironmentVariables } from '../dtos';

import { MessageBrokerConfiguration } from '@cali/message-broker-common';

export const messageBrokerConfiguration = ({
  MESSAGE_BROKER_DOMAIN: domain,
  MESSAGE_BROKER_PORT: port,
  MESSAGE_BROKER_PROTOCOL: protocol,
  MESSAGE_BROKER_USER: user,
  MESSAGE_BROKER_PASSWORD: password,
}: AppEnvironmentVariables): MessageBrokerConfiguration => ({
  domain,
  port,
  protocol,
  user,
  password,
});
