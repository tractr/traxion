import {
  BackendServiceComponentInternalConfig,
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
} from '@tractr/terraform-ecs-services';
import { DeepPartial } from 'ts-essentials';
import { ConstructOptions } from 'constructs';

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
export type PwaComponentPublicConfig = DeepPartial<PwaComponentDefaultConfig> &
  ConstructOptions;
export type PwaComponentConfig = BackendServiceComponentInternalConfig &
  PwaComponentPublicConfig;
