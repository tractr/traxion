import { POSTGRES_DEFAULT_CONFIG, PostgresComponentConfig } from './configs';
import { PostgresContainer } from './postgres.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-pool-group';

export class PostgresComponent extends BackendServiceComponent<PostgresComponentConfig> {
  protected getIngressPorts(): number[] {
    return [5432];
  }

  protected getContainers(): Container[] {
    return [
      new PostgresContainer(this, {
        ...POSTGRES_DEFAULT_CONFIG.postgresContainerConfig,
        ...this.config.postgresContainerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
