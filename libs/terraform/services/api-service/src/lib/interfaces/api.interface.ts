import { DeepPartial } from 'ts-essentials';

import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-ecs-services';

export interface ApiContainerPublicConfig extends HttpContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    NODE_ENV: EnvironmentOrSecretValue;
    NODE_OPTIONS?: EnvironmentOrSecretValue;
    API_URL: EnvironmentOrSecretValue;
    PWA_URL: EnvironmentOrSecretValue;
    POSTGRES_DB: EnvironmentOrSecretValue;
    POSTGRES_DB_TEST: EnvironmentOrSecretValue;
    POSTGRES_HOST: EnvironmentOrSecretValue;
    POSTGRES_PORT: EnvironmentOrSecretValue;
    POSTGRES_SCHEMA: EnvironmentOrSecretValue;
    POSTGRES_OPTIONS?: EnvironmentOrSecretValue;
    POSTGRES_USER: EnvironmentOrSecretValue;
    POSTGRES_PASSWORD: EnvironmentOrSecretValue;
    COOKIE_SECRET: EnvironmentOrSecretValue;
    JWT_SECRET: EnvironmentOrSecretValue;
  };
}
export type ApiContainerConfig = ContainerInternalConfig &
  ApiContainerPublicConfig;

export interface ApiComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: ApiContainerPublicConfig;
}
export type ApiComponentPublicConfig = DeepPartial<ApiComponentDefaultConfig>;
export type ApiComponentConfig = BackendServiceComponentInternalConfig &
  ApiComponentPublicConfig;
