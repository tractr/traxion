import {
  BackendServiceComponentPrivateConfig,
  ContainerPrivateConfig,
  HttpContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-pool-group';

export interface PwaContainerPublicConfig extends HttpContainerPublicConfig {
  apiPath: string;
}
export type PwaContainerConfig = PwaContainerPublicConfig &
  ContainerPrivateConfig;

export interface PwaComponentPublicConfig extends ServiceComponentPublicConfig {
  pwaContainerConfig: PwaContainerPublicConfig;
}
export type PwaComponentConfig = BackendServiceComponentPrivateConfig &
  PwaComponentPublicConfig;

export const PWA_DEFAULT_CONFIG: PwaComponentPublicConfig = {
  pwaContainerConfig: {
    apiPath: '/api',
    path: {
      prefix: `/`,
      stripPrefix: false,
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
  dockerImageTags: 'latest',
};
