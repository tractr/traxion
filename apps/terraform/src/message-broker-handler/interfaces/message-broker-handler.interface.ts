import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-service-ecs';
import { DeepPartial } from 'ts-essentials';

export interface MessageBrokerHandlerContainerPublicConfig
  extends ContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    MESSAGE_BROKER_URL: EnvironmentOrSecretValue;
    MESSAGE_BROKER_USER: EnvironmentOrSecretValue;
    MESSAGE_BROKER_PASSWORD: EnvironmentOrSecretValue;
  };
}
export type MessageBrokerHandlerContainerConfig = ContainerInternalConfig &
  MessageBrokerHandlerContainerPublicConfig;

export interface MessageBrokerHandlerComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: MessageBrokerHandlerContainerPublicConfig;
}
export type MessageBrokerHandlerComponentPublicConfig =
  DeepPartial<MessageBrokerHandlerComponentDefaultConfig>;

export type MessageBrokerHandlerComponentConfig =
  BackendServiceComponentInternalConfig &
    MessageBrokerHandlerComponentPublicConfig;
