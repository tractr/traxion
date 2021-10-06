import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  HttpContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-ecs-services';

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
  ContainerInternalConfig;

export interface ApiComponentPublicConfig extends ServiceComponentPublicConfig {
  apiContainerConfig: ApiContainerPublicConfig;
}
export type ApiComponentConfig = BackendServiceComponentInternalConfig &
  ApiComponentPublicConfig;
