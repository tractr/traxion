import {
  PWA_CONTAINER_DEFAULT_CONFIG,
  PwaContainerPublicConfig,
} from './configs';
import { PwaContainer } from './pwa.container';

import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  Container,
} from '@tractr/terraform-pool-group';

export class PwaComponent extends BackendServiceComponent<
  BackendServiceComponentConfig & PwaContainerPublicConfig
> {
  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    const { apiPath, cpu, environments, memory, secrets } = this.config;

    const pwaContainerConfig = {
      ...PWA_CONTAINER_DEFAULT_CONFIG,
      name: this.serviceName,
      path: {
        prefix: `/`,
        stripPrefix: false,
      },
      cpu,
      environments,
      memory,
      secrets,
    };

    if (apiPath) pwaContainerConfig.apiPath = apiPath;

    return [new PwaContainer(this, pwaContainerConfig)];
  }
}
