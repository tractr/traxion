import {
  ContainerInternalConfig,
  ContainerPublicConfig,
  EnvironmentOrSecretValue,
} from '@tractr/terraform-service-ecs';

export interface BackupContainerPublicConfig extends ContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    VOLUMERIZE_SOURCE: EnvironmentOrSecretValue;
    VOLUMERIZE_TARGET: EnvironmentOrSecretValue;
    VOLUMERIZE_JOBBER_TIME: EnvironmentOrSecretValue;
    VOLUMERIZE_FULL_IF_OLDER_THAN: EnvironmentOrSecretValue;
    JOB_NAME2?: EnvironmentOrSecretValue;
    JOB_COMMAND2?: EnvironmentOrSecretValue;
    JOB_TIME2?: EnvironmentOrSecretValue;
    JOB_NAME3?: EnvironmentOrSecretValue;
    JOB_COMMAND3?: EnvironmentOrSecretValue;
    JOB_TIME3?: EnvironmentOrSecretValue;
    AWS_ACCESS_KEY_ID?: EnvironmentOrSecretValue;
    AWS_SECRET_ACCESS_KEY?: EnvironmentOrSecretValue;
    POSTGRES_USER: EnvironmentOrSecretValue;
    POSTGRES_PASSWORD: EnvironmentOrSecretValue;
    POSTGRES_HOST: EnvironmentOrSecretValue;
    POSTGRES_PORT: EnvironmentOrSecretValue;
    POSTGRES_DB: EnvironmentOrSecretValue;
  };
}
export type BackupContainerConfig = ContainerInternalConfig &
  BackupContainerPublicConfig;
