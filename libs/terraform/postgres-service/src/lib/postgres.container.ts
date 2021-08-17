import { PostgresContainerConfig } from './configs';

import {
  BackendContainer,
  Environment,
  MountPoint,
  SecretMap,
} from '@tractr/terraform-pool-group';

export class PostgresContainer extends BackendContainer<PostgresContainerConfig> {
  protected getAppName(): string {
    return 'postgres';
  }

  getImageTag(): string {
    return '13-alpine';
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

  protected getEnvironments(): Environment[] {
    const envs = super.getEnvironments();

    const isPostgresDbSet = envs.some((env) => env.name === 'POSTGRES_DB');

    if (isPostgresDbSet) return envs;

    return envs.concat([{ name: 'POSTGRES_DB', value: this.config.dbName }]);
  }

  protected getSecrets(): (string | SecretMap)[] {
    let secrets = super.getSecrets();

    const isUserSet = secrets.some((secret) =>
      typeof secret === 'string'
        ? secret === 'POSTGRES_USER'
        : secret.name === 'POSTGRES_USER',
    );
    if (!isUserSet) secrets = secrets.concat('POSTGRES_USER');

    const isPwdSet = secrets.some((secret) =>
      typeof secret === 'string'
        ? secret === 'POSTGRES_PASSWORD'
        : secret.name === 'POSTGRES_PASSWORD',
    );
    if (!isPwdSet) secrets = secrets.concat('POSTGRES_PASSWORD');

    return secrets;
  }
}
