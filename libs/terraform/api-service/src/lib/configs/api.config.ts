import { HttpContainerConfig } from '@tractr/terraform-pool-group';

export interface ApiContainerDbConfig {
  host?: string;
  name: string;
  port: number;
  nameTest: string;
  schema: string;
  options?: string;
}

export interface ApiContainerConfig extends HttpContainerConfig {
  db: ApiContainerDbConfig;
  apiPath: string;
  pwaPath: string;
}

export interface ApiContainerPublicConfig extends Partial<HttpContainerConfig> {
  db?: Partial<ApiContainerDbConfig>;
}

export const API_CONTAINER_DEFAULT_CONFIG: Omit<
  ApiContainerConfig,
  'path' | 'name'
> = {
  db: {
    name: 'api',
    nameTest: 'testing',
    port: 5432,
    schema: 'public',
  },
  apiPath: '/api',
  pwaPath: '/',
};
