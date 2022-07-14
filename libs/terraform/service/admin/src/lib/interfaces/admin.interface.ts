import { DeepPartial } from 'ts-essentials';

import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-service-ecs';

export interface AdminContainerPublicConfig extends HttpContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    API_URL: EnvironmentOrSecretValue;
    HTML_BASE_HREF?: EnvironmentOrSecretValue;
  };
}
export type AdminContainerConfig = ContainerInternalConfig &
  AdminContainerPublicConfig;

export interface AdminComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: AdminContainerPublicConfig & {
    environments: {
      HTML_BASE_HREF: EnvironmentOrSecretValue;
      HTML_INDEX_PATH: EnvironmentOrSecretValue;
    };
  };
}
export type AdminComponentPublicConfig =
  DeepPartial<AdminComponentDefaultConfig>;
export type AdminComponentConfig = BackendServiceComponentInternalConfig &
  AdminComponentPublicConfig;
