import { DeepPartial } from 'ts-essentials';

import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-service-ecs';

export interface PostgresContainerPublicConfig extends ContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    POSTGRES_DB: EnvironmentOrSecretValue;
    POSTGRES_USER: EnvironmentOrSecretValue;
    POSTGRES_PASSWORD: EnvironmentOrSecretValue;
  };
}
export type PostgresContainerConfig = ContainerInternalConfig &
  PostgresContainerPublicConfig;

export interface PostgresComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: PostgresContainerPublicConfig;
}
export type PostgresComponentPublicConfig =
  DeepPartial<PostgresComponentDefaultConfig>;
export type PostgresComponentConfig = BackendServiceComponentInternalConfig &
  PostgresComponentPublicConfig;
