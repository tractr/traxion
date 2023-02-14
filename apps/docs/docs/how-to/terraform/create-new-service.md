---
id: create-new-service
title: Create a new service
sidebar_label: Create a new service
---

# Create a new service

:::info

Before reading this, you should know how ECS components work :

[Understanding the ECS components](/docs/how-to/terraform/ecs-components)

:::

## Introduction

In this tutorial, we are going to write add a Redis service to our application and deploy it.

This Redis service is based on the public image from Docker Hub.

## Create a new library using NX

Create a new library in `terraform/service/redis`:

```shell
nx generate @nrwl/node:library --name redis --directory terraform/service --buildable --importPath @project/terraform-service-redis
```

:::caution

Replace `@project/` by your project's prefix.

:::

This is the tree of our library:

```text
redis
├── .babelrc
├── CHANGELOG.md
├── details.md
├── .eslintrc.json
├── jest.config.ts
├── package.json
├── project.json
├── README.md
├── src
│   ├── index.ts
│   └── lib
│       ├── configs
│       │   ├── index.ts
│       │   └── redis.config.ts
│       ├── index.ts
│       ├── interfaces
│       │   ├── index.ts
│       │   └── redis.interface.ts
│       ├── redis.component.ts
│       └── redis.container.ts
├── tsconfig.json
├── tsconfig.lib.json
└── tsconfig.spec.json

4 directories, 19 files
```

## Create the Redis service

### Redis container

```typescript
// file: src/redis.container.ts

import { RedisContainerConfig } from './interfaces';

import { BackendContainer, MountPoint } from '@trxn/terraform-service-ecs';

export class RedisContainer extends BackendContainer<RedisContainerConfig> {
  protected getPort(): number {
    return 6379;
  }

  getMountPoints(): MountPoint[] {
    return [
      {
        sourceVolume: 'data',
        containerPath: '/data',
      },
    ];
  }
}
```

This class is a subclass of `BackendContainer` and overrides the `getPort` method to return the value specific to a Redis container. It also defines a single mount point to a volume called `data`, which will be used to store persistent data for the Redis container.

### Configuration and interface

```typescript
// file: src/configs/redis.configs.ts

import { RedisComponentDefaultConfig } from './interfaces';
import {
  Secret,
  SERVICE_COMPONENT_DEFAULT_CONFIG,
} from '@trxn/terraform-service-ecs';

export const REDIS_COMPONENT_DEFAULT_CONFIG: RedisComponentDefaultConfig = {
  ...SERVICE_COMPONENT_DEFAULT_CONFIG,
  containerConfig: {
    imageName: 'redis',
    imageTag: 'alpine3.17',
    environments: {
      REDIS_PASSWORD: Secret(),
    },
  },
};
```

This file is a configuration file for the `RedisComponent` class in the Redis service library. It defines the default configuration options that can be overridden when creating an instance of the `RedisComponent`.

### Redis component

```typescript
// file: src/redis.component.ts

import {
  BackendServiceComponent,
  Container,
} from '@trxn/terraform-service-ecs';
import { RedisContainer } from './redis.container';
import { RedisComponentConfig, RedisComponentDefaultConfig } from './interfaces';
import { AwsProviderConstruct } from '@trxn/terraform-component-aws';

export class RedisComponent extends BackendServiceComponent<
  RedisComponentConfig,
  RedisComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: RedisComponentConfig,
  ) {
    super(scope, id, config, REDIS_COMPONENT_DEFAULT_CONFIG);
  }

  protected getIngressPorts(): number[] {
    return [6379];
  }

  protected getContainers(): Container[] {
    return [
      new RedisContainer(this, {
        ...this.config.containerConfig,
        name: 'redis',
      }),
    ];
  }

  /**
   * Redis service does not have a backup container, so it does not need to
   * access itself.
   */
  protected shouldAccessItself(): boolean {
    return false;
  }
}
```

The `RedisComponent` extends `BackendServiceComponent` rather than `ServiceComponent` because it is a backend service that requires a security group to be created in order to accept incoming connections. The `BackendServiceComponent` class handles the creation of this security group, as well as other functionality related to backend services such as creating an execution role for the service.

## Add the Redis service to the stack

The file `main.stack.ts` is the main file of the Terraform application. It defines an AWS stack and all the resources that should be created within this stack. These resources include:

- A registry group for building and publishing docker containers
- A zone group for managing DNS zones
- A network group for creating a VPC and subnets
- Pool groups for each environment (e.g. development, staging, production)
- HTTP services (e.g. PWA, admin, api)
- Backend services (e.g. postgres)

The `MainStack` class extends the `AwsStack` class and overrides the constructor to define all the resources. It uses helper classes (e.g. `RegistryGroup`, `ZoneGroup`, `NetworkGroup`, `PoolGroup`) to manage the creation of these resources. Each resource is added to the stack using the `addHttpService` or `addBackendService` methods of the `PoolGroup` class.

To add the `RedisComponent` to the `MainStack`, you will need to:

1. In the file `environment.interface.ts` add the interface of the Redis component configuration.

    ```typescript
    // ...
    import { RedisComponentPublicConfig } from '@trxn/terraform-service-redis';
    
    export interface Environment {
    // ...
    config: {
    		// ...
    		/**
    		 * Redis config override
    		 */
    		redis?: RedisComponentPublicConfig;
      };
    }
    
    ```

2. Add a field to the `AppConfig` object for the `redis` service, for example:

    ```typescript
    export const AppConfig: Required<Environment['config']> = {
      api: {},
      pwa: {},
      admin: {},
      postgres: {},
      redis: {},
      reverseProxy: {},
    };
    ```

3. Import the `RedisComponent` at the top of the `main.stack.ts` file:

    ```typescript
    import { RedisComponent } from '@trxn/terraform-service-redis';
    ```

4. Add the `RedisComponent` to the appropriate `PoolGroup` in the `MainStack` constructor. You will need to decide which environment(s) you want to add the `RedisComponent` to, and then add it using the `addBackendService` method of the `PoolGroup`:

    ```typescript
    // ...
    
    for (const environment of Environments) {
      // Merge app configs and environment configs
      const mergedConfig = deepmerge(AppConfig, environment.config);
    
      // Add the pool group that will host our container
      const poolGroup = new PoolGroup(this, environment.resourceId, {
        // ...
      });
    
    	// ...
    
      // Add a api as a http service
      const api = poolGroup.addHttpService(
        ApiComponent,
        'api',
        mergedConfig.api,
      );
    
    	// ...
    
      // Add a redis as a backend service
      poolGroup.addBackendService(
        RedisComponent,
        'redis',
        [api],
        mergedConfig.redis,
      );
    
      // Store group
      this.poolGroups.push(poolGroup);
    }
    ```

#### Configuration per environments

To set a custom configuration for the service `redis` in a specific environment, for example **Production**, you can update the `config` object in the `Environments` array like this:

```typescript
import { Environment } from '../interfaces';

export const Environments: Environment[] = [
  {
    name: 'Production',
    resourceId: 'prod',
    subDomain: 'www',
    config: {
      // ...
      postgres: { enableBackups: true },
      redis: {
        containerConfig: { imageTag: 'my-custom-image-tag' },
        desiredCount: 2,
        cpu: '1024',
        memory: '2048',
      },
    },
  },
  {
    name: 'Staging',
    resourceId: 'staging',
    subDomain: 'staging',
    config: {
      // ...
    },
  },
];
```
