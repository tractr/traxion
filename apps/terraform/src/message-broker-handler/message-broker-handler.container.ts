import {
  BackendContainer,
  EnvironmentDefinition,
} from '@tractr/terraform-service-ecs';

import { MessageBrokerHandlerContainerConfig } from './interfaces';

export class MessageBrokerHandlerContainer extends BackendContainer<MessageBrokerHandlerContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'message-broker-handler';
  }

  protected getPort(): number {
    return 3334;
  }

  protected getEnvironments(): EnvironmentDefinition[] {
    const envs = super.getEnvironments();

    envs.push({
      name: 'ENVS_NAMES',
      value: this.getEnvNames().join(','),
    });

    return envs;
  }
}
