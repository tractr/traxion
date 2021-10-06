# terraform-pwa-service

Provides a PWA service with a single PWA container.

## Configuration example

```typescript
const pwa = new PwaComponent(this, 'pwa', {
  containerConfig: {
    imageTag: 'latest',
    apiPath: '/api',
    path: {
      prefix: `/`,
      stripPrefix: false,
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```
