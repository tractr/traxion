import { DeepPartial } from 'ts-essentials';

import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
} from '@trxn/terraform-service-ecs';

export interface PwaContainerPublicConfig extends HttpContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    API_URL: EnvironmentOrSecretValue;
  };
}
export type PwaContainerConfig = ContainerInternalConfig &
  PwaContainerPublicConfig;

export interface PwaComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: PwaContainerPublicConfig;
}
export type PwaComponentPublicConfig = DeepPartial<PwaComponentDefaultConfig>;
export type PwaComponentConfig = BackendServiceComponentInternalConfig &
  PwaComponentPublicConfig;
