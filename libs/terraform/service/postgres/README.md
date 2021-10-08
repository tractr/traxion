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
