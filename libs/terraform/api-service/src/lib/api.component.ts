import { ApiContainer } from './api.container';
import {
  API_CONTAINER_DEFAULT_CONFIG,
  ApiContainerPublicConfig,
} from './configs';

import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  Container,
} from '@tractr/terraform-pool-group';

export class ApiComponent extends BackendServiceComponent<
  BackendServiceComponentConfig & ApiContainerPublicConfig
> {
  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    const { db, apiPath, pwaPath, cpu, environments, memory, secrets } =
      this.config;

    const apiContainerConfig = {
      ...API_CONTAINER_DEFAULT_CONFIG,
      name: this.serviceName,
      path: {
        prefix: `/${this.serviceName}`,
        stripPrefix: false,
      },
      cpu,
      environments,
      memory,
      secrets,
    };

    if (db) apiContainerConfig.db = { ...apiContainerConfig.db, ...db };
    if (apiPath) apiContainerConfig.apiPath = apiPath;
    if (pwaPath) apiContainerConfig.pwaPath = pwaPath;

    return [new ApiContainer(this, apiContainerConfig)];
  }
}
