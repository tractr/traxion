import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-ecs-services';

export interface PostgresContainerPublicConfig extends ContainerPublicConfig {
  dbName: string;
}
export type PostgresContainerConfig = PostgresContainerPublicConfig &
  ContainerInternalConfig;

export interface PostgresComponentPublicConfig
  extends ServiceComponentPublicConfig {
  containerConfig: PostgresContainerPublicConfig;
}
export type PostgresComponentConfig = BackendServiceComponentInternalConfig &
  PostgresComponentPublicConfig;
