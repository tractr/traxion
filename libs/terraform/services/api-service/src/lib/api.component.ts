import { ApiContainer } from './api.container';
import { ApiComponentConfig, ApiComponentDefaultConfig } from './interfaces';

import {
  BackendServiceComponent,
  Container,
  Secret,
} from '@tractr/terraform-ecs-services';

export class ApiComponent extends BackendServiceComponent<
  ApiComponentConfig,
  ApiComponentDefaultConfig
> {
  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    return [
      new ApiContainer(this, {
        ...this.config.containerConfig,
        name: 'api',
      }),
    ];
  }

  protected getDefaultConfig(): ApiComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: 'latest',
        path: {
          prefix: '/api',
          stripPrefix: false,
        },
        environments: {
          NODE_ENV: 'production',
          API_URL: (service) => service.getApplicationUrl('/api'),
          PWA_URL: (service) => service.getApplicationUrl(''),
          POSTGRES_DB: 'api',
          POSTGRES_DB_TEST: 'testing',
          POSTGRES_HOST: (service) => service.getServiceDomainName('postgres'),
          POSTGRES_PORT: '5432',
          POSTGRES_SCHEMA: 'public',
          POSTGRES_USER: Secret(),
          POSTGRES_PASSWORD: Secret(),
          COOKIE_SECRET: Secret(),
          JWT_SECRET: Secret(),
        },
      },
    };
  }
}
