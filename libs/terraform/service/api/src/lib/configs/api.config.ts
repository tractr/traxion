import { ApiComponentDefaultConfig } from '../interfaces';

import {
  Secret,
  SERVICE_COMPONENT_DEFAULT_CONFIG,
} from '@tractr/terraform-service-ecs';

export const API_COMPONENT_DEFAULT_CONFIG: ApiComponentDefaultConfig = {
  ...SERVICE_COMPONENT_DEFAULT_CONFIG,
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
