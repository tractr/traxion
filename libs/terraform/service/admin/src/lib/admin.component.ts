import {
  AdminComponentConfig,
  AdminComponentDefaultConfig,
} from './interfaces';
import { AdminContainer } from './admin.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-service-ecs';

export class AdminComponent extends BackendServiceComponent<
  AdminComponentConfig,
  AdminComponentDefaultConfig
> {
  protected getIngressPorts(): number[] {
    return [4200];
  }

  protected getContainers(): Container[] {
    return [
      new AdminContainer(this, {
        ...this.config.containerConfig,
        name: 'admin',
      }),
    ];
  }

  protected getDefaultConfig(): AdminComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: 'latest',
        path: {
          prefix: '/admin',
          stripPrefix: true,
        },
        environments: {
          API_URL: (service) => service.getApplicationUrl('/api'),
          HTML_BASE_HREF: '/admin/',
          HTML_INDEX_PATH: '/usr/share/nginx/html/index.html',
        },
      },
    };
  }
}
