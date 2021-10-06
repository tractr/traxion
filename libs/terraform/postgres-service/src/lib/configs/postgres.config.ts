import {
  BackendServiceComponentPrivateConfig,
  ContainerPrivateConfig,
  ContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-pool-group';

export interface PostgresContainerPublicConfig extends ContainerPublicConfig {
  dbName: string;
}
export type PostgresContainerConfig = PostgresContainerPublicConfig &
  ContainerPrivateConfig;

export interface PostgresComponentPublicConfig
  extends ServiceComponentPublicConfig {
  containerConfig: PostgresContainerPublicConfig;
}
export type PostgresComponentConfig = BackendServiceComponentPrivateConfig &
  PostgresComponentPublicConfig;
