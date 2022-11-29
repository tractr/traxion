import { BackupContainerConfig } from './interfaces';

import { Container, MountPoint } from '@trxn/terraform-service-ecs';

export class BackupContainer extends Container<BackupContainerConfig> {
  protected getAppName(): string {
    return 'tractr/postgres-backup';
  }

  getMountPoints(): MountPoint[] {
    return [
      {
        sourceVolume: 'cache',
        containerPath: '/volumerize-cache/',
      },
      {
        sourceVolume: 'backups',
        containerPath: '/backups/',
        preventDestroy: true,
        enableBackups: true,
      },
    ];
  }
}
