# terraform-service-pwa

Provides a PWA service with a single PWA container.

## Configuration example

```typescript
const pwa = new PwaComponent(this, 'pwa', {
  containerConfig: {
    imageTag: 'latest',
    path: {
      prefix: '/',
      stripPrefix: false,
    },
    environments: {
      API_URL: (service) => service.getApplicationUrl('/api'),
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```

