import { PWA_CONTAINER_DEFAULT_CONFIG } from './configs';
import { PwaContainer } from './pwa.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-pool-group';

export class PwaComponent extends BackendServiceComponent {
  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    return [
      new PwaContainer(this, {
        name: this.serviceName,
        path: {
          prefix: '/',
          stripPrefix: false,
        },
        ...PWA_CONTAINER_DEFAULT_CONFIG,
      }),
    ];
  }
}
