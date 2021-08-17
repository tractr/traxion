import {
  PostgresContainerConfig,
  PostgresPublicContainerConfig,
} from './configs';
import { PostgresContainer } from './postgres.container';

import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  Container,
} from '@tractr/terraform-pool-group';

export class PostgresComponent extends BackendServiceComponent<
  BackendServiceComponentConfig & PostgresPublicContainerConfig
> {
  protected getIngressPorts(): number[] {
    return [5432];
  }

  protected getContainers(): Container[] {
    const { dbName, cpu, environments, memory, secrets } = this.config;

    const postgresContainerConfig: PostgresContainerConfig = {
      name: this.serviceName,
      cpu,
      environments,
      memory,
      secrets,
      dbName,
    };

    return [new PostgresContainer(this, postgresContainerConfig)];
  }
}
