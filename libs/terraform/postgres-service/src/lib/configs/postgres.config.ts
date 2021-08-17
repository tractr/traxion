import { ContainerConfig } from '@tractr/terraform-pool-group';

export interface PostgresContainerConfig extends ContainerConfig {
  dbName: string;
}

export interface PostgresPublicContainerConfig
  extends Partial<ContainerConfig> {
  dbName: string;
}
