import { PostgresContainerConfig } from './interfaces';

import { BackendContainer, MountPoint } from '@tractr/terraform-service-ecs';

export class PostgresContainer extends BackendContainer<PostgresContainerConfig> {
  protected getAppName(): string {
    return 'postgres';
  }

  protected getPort(): number {
    return 5432;
  }

  getMountPoints(): MountPoint[] {
    return [
      {
        sourceVolume: 'data',
        containerPath: '/var/lib/postgresql/data/',
      },
    ];
  }
}
