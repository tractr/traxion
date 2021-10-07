import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-ecs-services';
import { DeepPartial } from 'ts-essentials';
import { ConstructOptions } from 'constructs';

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
  DeepPartial<PostgresComponentDefaultConfig> & ConstructOptions;
export type PostgresComponentConfig = BackendServiceComponentInternalConfig &
  PostgresComponentPublicConfig;
