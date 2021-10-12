import {
  PostgresComponentConfig,
  PostgresComponentDefaultConfig,
} from './interfaces';
import { PostgresContainer } from './postgres.container';

import {
  BackendServiceComponent,
  Container,
  Secret,
} from '@tractr/terraform-service-ecs';

export class PostgresComponent extends BackendServiceComponent<
  PostgresComponentConfig,
  PostgresComponentDefaultConfig
> {
  protected getIngressPorts(): number[] {
    return [5432];
  }

  protected getContainers(): Container[] {
    return [
      new PostgresContainer(this, {
        ...this.config.containerConfig,
        name: 'postgres',
      }),
    ];
  }

  protected getDefaultConfig(): PostgresComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: '13-alpine',
        environments: {
          POSTGRES_DB: 'api',
          POSTGRES_USER: Secret(),
          POSTGRES_PASSWORD: Secret(),
        },
      },
    };
  }
}
