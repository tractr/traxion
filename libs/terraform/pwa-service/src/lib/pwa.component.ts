import { PWA_DEFAULT_CONFIG, PwaComponentConfig } from './configs';
import { PwaContainer } from './pwa.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-pool-group';

export class PwaComponent extends BackendServiceComponent<PwaComponentConfig> {
  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    return [
      new PwaContainer(this, {
        ...PWA_DEFAULT_CONFIG.pwaContainerConfig,
        ...this.config.pwaContainerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
