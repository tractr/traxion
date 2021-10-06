import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  HttpContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-ecs-services';

export interface PwaContainerPublicConfig extends HttpContainerPublicConfig {
  apiPath: string;
}
export type PwaContainerConfig = PwaContainerPublicConfig &
  ContainerInternalConfig;

export interface PwaComponentPublicConfig extends ServiceComponentPublicConfig {
  containerConfig: PwaContainerPublicConfig;
}
export type PwaComponentConfig = BackendServiceComponentInternalConfig &
  PwaComponentPublicConfig;
