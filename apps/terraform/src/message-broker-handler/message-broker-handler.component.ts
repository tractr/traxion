import {
  BackendServiceComponent,
  Container,
  Secret,
} from '@tractr/terraform-service-ecs';

import {
  MessageBrokerHandlerComponentConfig,
  MessageBrokerHandlerComponentDefaultConfig,
} from './interfaces';
import { MessageBrokerHandlerContainer } from './message-broker-handler.container';

export class MessageBrokerHandlerComponent extends BackendServiceComponent<
  MessageBrokerHandlerComponentConfig,
  MessageBrokerHandlerComponentDefaultConfig
> {
  protected getIngressPorts(): number[] {
    return [3334];
  }

  protected getContainers(): Container[] {
    return [
      new MessageBrokerHandlerContainer(this, {
        ...this.config.containerConfig,
        name: 'message-broker-handler',
      }),
    ];
  }

  protected getDefaultConfig(): MessageBrokerHandlerComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: 'latest',
        environments: {
          MESSAGE_BROKER_DOMAIN: Secret(),
          MESSAGE_BROKER_PORT: Secret(),
          MESSAGE_BROKER_PROTOCOL: Secret(),
          MESSAGE_BROKER_USER: Secret(),
          MESSAGE_BROKER_PASSWORD: Secret(),
        },
      },
    };
  }

  getDockerApplication() {
    return this.config.dockerApplications['message-broker-handler'];
  }
}
