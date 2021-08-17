import { HttpContainerConfig } from '@tractr/terraform-pool-group';

export interface PwaContainerConfig extends HttpContainerConfig {
  apiPath: string;
}

export interface PwaContainerPublicConfig extends Partial<HttpContainerConfig> {
  apiPath?: string;
}

export const PWA_CONTAINER_DEFAULT_CONFIG: Pick<PwaContainerConfig, 'apiPath'> =
  {
    apiPath: '/api',
  };
