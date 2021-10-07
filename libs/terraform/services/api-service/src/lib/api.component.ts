import { ApiContainer } from './api.container';
import { ApiComponentConfig, ApiComponentDefaultConfig } from './interfaces';

import {
  BackendServiceComponent,
  Container,
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
        name: this.serviceName,
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
          NODE_ENV: { type: 'env', value: 'production' },
          API_URL: {
            type: 'env',
            value: (service) => service.getApplicationUrl('/api'),
          },
          PWA_URL: {
            type: 'env',
            value: (service) => service.getApplicationUrl(''),
          },
          POSTGRES_DB: { type: 'env', value: 'api' },
          POSTGRES_DB_TEST: { type: 'env', value: 'testing' },
          POSTGRES_HOST: {
            type: 'env',
            value: (service) => service.getServiceDomainName('postgres'),
          },
          POSTGRES_PORT: { type: 'env', value: '5432' },
          POSTGRES_SCHEMA: { type: 'env', value: 'public' },
          POSTGRES_USER: { type: 'secret' },
          POSTGRES_PASSWORD: { type: 'secret' },
          COOKIE_SECRET: { type: 'secret' },
          JWT_SECRET: { type: 'secret' },
        },
      },
    };
  }
}
