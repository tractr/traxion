import { ApiComponentPublicConfig } from '@tractr/terraform-api-service';
import {
  BackendServiceComponentPrivateConfig,
  ContainerConfig,
  ContainerPrivateConfig,
  ContainerPublicConfig,
  HttpContainerPublicConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-pool-group';

export interface PostgresContainerPublicConfig extends ContainerPublicConfig {
  dbName: string;
}
export type PostgresContainerConfig = PostgresContainerPublicConfig &
  ContainerPrivateConfig;

export interface PostgresComponentPublicConfig
  extends ServiceComponentPublicConfig {
  postgresContainerConfig: PostgresContainerPublicConfig;
}
export type PostgresComponentConfig = BackendServiceComponentPrivateConfig &
  PostgresComponentPublicConfig;

export const POSTGRES_DEFAULT_CONFIG: PostgresComponentPublicConfig = {
  postgresContainerConfig: {
    dbName: 'api',
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
  dockerImageTags: '13-alpine',
};
