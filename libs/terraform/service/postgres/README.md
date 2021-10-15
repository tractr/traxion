# terraform-service-postgres

Provides a database service with a single Postgres container.

## Configuration example

```typescript
const postgres = new PostgresComponent(this, 'postgres', {
  containerConfig: {
    imageTag: '13-alpine',
    environments: {
      POSTGRES_DB: 'api',
      POSTGRES_USER: Secret(),
      POSTGRES_PASSWORD: Secret(),
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```

## Backups

This service also provide a backup system based on image `tractr/postgres-backup` which is based on `blacklabelops/volumerize`.
This last one is able to store backups on many providers.
By default, this service stores the backups on a persistent container Volume, i.e. on AWS EFS.

You may want to store backups on another providers.
See the [Volumerize documentation](https://github.com/blacklabelops/volumerize) for more examples.
This is an exemple that stores backups on AWS S3:

```typescript
const postgres = new PostgresComponent(this, 'postgres', {
  containerConfig: {
    imageTag: '13-alpine',
    environments: {
      POSTGRES_DB: 'api',
      POSTGRES_USER: Secret(),
      POSTGRES_PASSWORD: Secret(),
    },
  },
  enableBackups: true,
  backupsConfig: {
    imageTag: 'v1.7',
    environments: {
      VOLUMERIZE_SOURCE: '/source',
      VOLUMERIZE_TARGET: 's3://s3.eu-central-1.amazonaws.com/duplicitytest',
      VOLUMERIZE_JOBBER_TIME: '0 0 */4 * * *',
      VOLUMERIZE_FULL_IF_OLDER_THAN: '3D',
      JOB_NAME2: 'RemoveOldBackups',
      JOB_COMMAND2: '/etc/volumerize/remove-older-than 1M --force',
      JOB_TIME2: '0 0 2 * * *',
      JOB_NAME3: 'CleanupBackups',
      JOB_COMMAND3: '/etc/volumerize/cleanup --force',
      JOB_TIME3: '0 0 3 * * *',
      AWS_ACCESS_KEY_ID: 'QQWDQIWIDO1QO',
      AWS_SECRET_ACCESS_KEY: 'ewlfkwkejflkjwlkej3fjw381',
      POSTGRES_USER: Secret(),
      POSTGRES_PASSWORD: Secret(),
      POSTGRES_HOST: 'postgres',
      POSTGRES_PORT: '5432',
      POSTGRES_DB: Secret(),
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```
