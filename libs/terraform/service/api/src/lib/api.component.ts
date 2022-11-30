import { ApiContainer } from './api.container';
import { API_COMPONENT_DEFAULT_CONFIG } from './configs';
import { ApiComponentConfig, ApiComponentDefaultConfig } from './interfaces';

import { AwsProviderConstruct } from '@trxn/terraform-component-aws';
import {
  BackendServiceComponent,
  Container,
} from '@trxn/terraform-service-ecs';

export class ApiComponent extends BackendServiceComponent<
  ApiComponentConfig,
  ApiComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ApiComponentConfig,
  ) {
    super(scope, id, config, API_COMPONENT_DEFAULT_CONFIG);
  }

  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    return [
      new ApiContainer(this, {
        ...this.config.containerConfig,
        name: 'api',
      }),
    ];
  }
}
