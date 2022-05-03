import { BackupContainer } from './backup.container';
import { POSTGRES_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  PostgresComponentConfig,
  PostgresComponentDefaultConfig,
} from './interfaces';
import { PostgresContainer } from './postgres.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import {
  BackendServiceComponent,
  Container,
} from '@tractr/terraform-service-ecs';

export class PostgresComponent extends BackendServiceComponent<
  PostgresComponentConfig,
  PostgresComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PostgresComponentConfig,
  ) {
    super(scope, id, config, POSTGRES_COMPONENT_DEFAULT_CONFIG);
  }

  protected getIngressPorts(): number[] {
    return [5432];
  }

  protected getContainers(): Container[] {
    const containers: Container[] = [
      new PostgresContainer(this, {
        ...this.config.containerConfig,
        name: 'postgres',
      }),
    ];

    if (this.config.enableBackups) {
      containers.push(
        new BackupContainer(this, {
          ...this.config.backupsConfig,
          name: 'backup',
        }),
      );
    }

    return containers;
  }

  /**
   * If the backups are enabled, the backup container need the call this service
   * in order to connect to postgres. Therefore the security group should accept
   * incoming connection from itself.
   */
  protected shouldAccessItself(): boolean {
    return this.config.enableBackups;
  }
}
