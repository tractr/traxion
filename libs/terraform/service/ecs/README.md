# ECS services

Provides abstractions of ECS services and containers definitions. This includes
security group, volume, service discovery and deployment management.

## Configuration

A service can have multiple containers.

### Services

Services have an internal config, a public config and a default config.

#### Internal config

Internal config carry out the properties defined by the parent component, such
as `vpcId`.

#### Default config

Default config contains all properties that you can defined but have a default
value if nothing is passed.

This default config is merged with the internal and public config when
instantiating the serivce.

Every service have a property that provides this default values.

This default config also carry the default config of the container(s).

#### Public config

This is basically the default config with all keys as optional.

This is the config you can pass when instantiating the service.

### Containers

Containers have an internal config and a public config.

#### Internal config

Internal config carry out the properties defined by the service, such as
container's name.

#### Public config

Public config carry out all the properties that you can set. All of them must be
defined.

The service, with its default config, will inject default values when
instantiating the container. Only the service manages the default values of the
container. You can override the container's default value with the service's
public config.

## Environments

Plain environments and secrets are passed through the environments array in the
container's config. Depending on the value, the container will sort them into
environment or secret.

Here are all possible ways to define an environment or a secret:

```typescript
import { Secret, SECRET_ENVIRONMENT } from '@tractr/terraform-service-ecs';
const config = {
  containerConfig: {
    environments: {
      // Creates env API_URL
      API_URL: '/api',
      API_URL: (service, config) => service.getApplicationUrl('/api'),
      API_URL: { type: 'env', value: '/api' },
      API_URL: {
        type: 'env',
        value: (service, config) => service.getApplicationUrl('/api'),
      },

      // Creates env POSTGRES_PASSWORD with the value of the secret POSTGRES_PASSWORD
      POSTGRES_PASSWORD: Secret(),
      POSTGRES_PASSWORD: SECRET_ENVIRONMENT,
      POSTGRES_PASSWORD: { type: 'secret' },

      // Creates env POSTGRES_USER with the value of the secret DATABASE_USER
      POSTGRES_USER: Secret('DATABASE_USER'),
      POSTGRES_USER: { type: 'secret', secretKey: 'DATABASE_USER' },
    },
  },
};
```

