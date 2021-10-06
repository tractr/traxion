import { PostgresComponentConfig } from './configs';
import { PostgresContainer } from './postgres.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-ecs-services';

export class PostgresComponent extends BackendServiceComponent<PostgresComponentConfig> {
  protected getIngressPorts(): number[] {
    return [5432];
  }

  protected getContainers(): Container[] {
    return [
      new PostgresContainer(this, {
        ...this.config.containerConfig,
        name: this.serviceName,
      }),
    ];
  }
}
