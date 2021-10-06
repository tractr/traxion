import { PwaComponentConfig } from './configs';
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
        ...this.config.containerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
