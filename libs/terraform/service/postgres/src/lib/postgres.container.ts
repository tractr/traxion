import { PostgresContainerConfig } from './interfaces';

import { BackendContainer, MountPoint } from '@trxn/terraform-service-ecs';

export class PostgresContainer extends BackendContainer<PostgresContainerConfig> {
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
