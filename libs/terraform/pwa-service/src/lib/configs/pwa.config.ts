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
  containerConfig: PwaContainerPublicConfig;
}
export type PwaComponentConfig = BackendServiceComponentPrivateConfig &
  PwaComponentPublicConfig;
