import { PwaComponentConfig, PwaComponentDefaultConfig } from './interfaces';
import { PwaContainer } from './pwa.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-ecs-services';

export class PwaComponent extends BackendServiceComponent<
  PwaComponentConfig,
  PwaComponentDefaultConfig
> {
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

  protected getDefaultConfig(): PwaComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: 'latest',
        path: {
          prefix: '/',
          stripPrefix: false,
        },
        environments: {
          API_URL: {
            type: 'env',
            value: (service) => service.getApplicationUrl('/api'),
          },
        },
      },
    };
  }
}
