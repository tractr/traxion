import { ApiContainer } from './api.container';
import { API_DEFAULT_CONFIG, ApiComponentConfig } from './configs';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-pool-group';

export class ApiComponent extends BackendServiceComponent<ApiComponentConfig> {
  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    return [
      new ApiContainer(this, {
        ...API_DEFAULT_CONFIG.apiContainerConfig,
        ...this.config.apiContainerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
