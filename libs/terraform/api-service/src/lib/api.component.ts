import { ApiContainer } from './api.container';
import { ApiComponentConfig } from './configs';

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
        ...this.config.apiContainerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
