import {
  PostgresComponentConfig,
  PostgresComponentDefaultConfig,
} from './interfaces';
import { PostgresContainer } from './postgres.container';

import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-ecs-services';

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
        name: this.serviceName,
      }),
    ];
  }

  protected getDefaultConfig(): PostgresComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: '13-alpine',
        environments: {
          POSTGRES_DB: { type: 'env', value: 'api' },
          POSTGRES_USER: { type: 'secret' },
          POSTGRES_PASSWORD: { type: 'secret' },
        },
      },
    };
  }
}
