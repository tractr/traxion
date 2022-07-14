# terraform-service-admin

Provides an admin dashboard service with a single admin container.

## Configuration example

```typescript
const admin = new AdminComponent(this, 'admin', {
  containerConfig: {
    imageTag: 'latest',
    path: {
      prefix: '/admin',
      stripPrefix: true,
    },
    environments: {
      API_URL: (service) => service.getApplicationUrl('/api'),
      HTML_BASE_HREF: '/admin/',
    },
  },
  desiredCount: 1,
  cpu: '256',
  memory: '512',
});
```
