import {
  BackendServiceComponentPrivateConfig,
  ContainerPrivateConfig,
  HttpContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-pool-group';

export interface ApiContainerDbConfig {
  host?: string;
  name: string;
  port: number;
  nameTest: string;
  schema: string;
  options?: string;
}

export interface ApiContainerPublicConfig extends HttpContainerPublicConfig {
  db: ApiContainerDbConfig;
  apiPath: string;
  pwaPath: string;
}
export type ApiContainerConfig = ApiContainerPublicConfig &
  ContainerPrivateConfig;

export interface ApiComponentPublicConfig extends ServiceComponentPublicConfig {
  apiContainerConfig: ApiContainerPublicConfig;
}
export type ApiComponentConfig = BackendServiceComponentPrivateConfig &
  ApiComponentPublicConfig;

export const API_DEFAULT_CONFIG: ApiComponentPublicConfig = {
  apiContainerConfig: {
    db: {
      name: 'api',
      nameTest: 'testing',
      port: 5432,
      schema: 'public',
    },
    path: {
      prefix: `/api`,
      stripPrefix: false,
    },
    apiPath: '/api',
    pwaPath: '/',
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
  dockerImageTags: 'latest',
};
