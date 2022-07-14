import { AdminContainer } from './admin.container';
import { ADMIN_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  AdminComponentConfig,
  AdminComponentDefaultConfig,
} from './interfaces';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-service-ecs';

export class AdminComponent extends BackendServiceComponent<
  AdminComponentConfig,
  AdminComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: AdminComponentConfig,
  ) {
    super(scope, id, config, ADMIN_COMPONENT_DEFAULT_CONFIG);
  }

  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    return [
      new AdminContainer(this, {
        ...this.config.containerConfig,
        name: 'admin',
      }),
    ];
  }
}
