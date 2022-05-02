import { PWA_COMPONENT_DEFAULT_CONFIG } from './configs';
import { PwaComponentConfig, PwaComponentDefaultConfig } from './interfaces';
import { PwaContainer } from './pwa.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-service-ecs';

export class PwaComponent extends BackendServiceComponent<
  PwaComponentConfig,
  PwaComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PwaComponentConfig,
  ) {
    super(scope, id, config, PWA_COMPONENT_DEFAULT_CONFIG);
  }

  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    return [
      new PwaContainer(this, {
        ...this.config.containerConfig,
        name: 'pwa',
      }),
    ];
  }
}
