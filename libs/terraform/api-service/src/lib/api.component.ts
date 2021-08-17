import { ApiContainer } from './api.container';
import { API_CONTAINER_DEFAULT_CONFIG } from './configs';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-pool-group';

export class ApiComponent extends BackendServiceComponent {
  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    return [
      new ApiContainer(this, {
        name: this.serviceName,
        path: {
          prefix: `/${this.serviceName}`,
          stripPrefix: false,
        },
        ...API_CONTAINER_DEFAULT_CONFIG,
      }),
    ];
  }
}
