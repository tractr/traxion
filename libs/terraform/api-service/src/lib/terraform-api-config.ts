import { HttpContainerConfig } from '@tractr/terraform-pool-group';

export const API_CONTAINER_DEFAULT_CONFIG: Partial<ApiContainerConfig> = {
  db: {
    api: 'api',
    nameTest: 'testing',
    port: 5432,
    schema: 'public',
  },
  apiPath: '/api',
  pwaPath: '/',
};

export interface ApiContainerConfig extends HttpContainerConfig {
  db?: {
    name?: string;
    port?: number;
    nameTest?: string;
    schema?: string;
    options?: string;
  };
  apiPath?: string;
  pwaPath?: string;
}
