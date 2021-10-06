# terraform-postgres-service

Provides a database service with a single Postgres container.

## Configuration example

```typescript
const postgres = new PostgresComponent(this, 'postgres', {
  containerConfig: {
    imageTag: '13-alpine',
    dbName: 'api',
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```
