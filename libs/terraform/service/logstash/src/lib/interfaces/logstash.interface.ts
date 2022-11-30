import { DeepPartial } from 'ts-essentials';

import { CloudwatchUserComponentArtifacts } from './cloudwatch-user.interface';

import {
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
  ServiceComponentArtifacts,
  ServiceComponentDefaultConfig,
  ServiceComponentInternalConfig,
} from '@trxn/terraform-service-ecs';

export interface LogstashContainerPublicConfig extends ContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    XPACK_MONITORING_ENABLED: EnvironmentOrSecretValue;
    XPACK_MANAGEMENT_ENABLED: EnvironmentOrSecretValue;
    XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID: EnvironmentOrSecretValue;
    XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH: EnvironmentOrSecretValue;
    XPACK_MANAGEMENT_PIPELINE_ID: EnvironmentOrSecretValue;
  };
}
export type LogstashContainerConfig = ContainerInternalConfig &
  LogstashContainerPublicConfig;

export interface LogstashComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: LogstashContainerPublicConfig;
}
export type LogstashComponentPublicConfig =
  DeepPartial<LogstashComponentDefaultConfig>;
export type LogstashComponentConfig = ServiceComponentInternalConfig &
  LogstashComponentPublicConfig;

export interface LogstashComponentArtifacts extends ServiceComponentArtifacts {
  cloudwatch: CloudwatchUserComponentArtifacts;
}
