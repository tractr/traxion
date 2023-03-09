---
id: add-a-new-environment
title: Add a new environment
sidebar_label: Add a new environment
---

# Add a new environment

## Configuration scopes

The `AppConfig` object, defined in the file `apps/terraform/src/configs/apps.config.ts`, is a default configuration for the different components or services of your web application. It defines empty objects for each of the properties `api`, `pwa`, `admin`, `postgres`, and `reverseProxy`. This means that there are no default configuration options set for these components.

The purpose of `AppConfig` is to provide a base set of configuration options that can be used as a starting point for different environments of your web application. These configuration options can override the default configuration options defined in the individual packages for each component. By default, `AppConfig` does not override any configuration options, so the default options defined in the individual packages are used.

The `Environments` array, defined in the file `apps/terraform/src/configs/environments.config.ts`, is an array of `Environment` objects that define different environments of your web application. Each `Environment` object has a `name`, `resourceId`, `subDomain`, and `config` property. The `config` property is an object that can override the default configuration options in `AppConfig` for a specific environment.

For example, you might have a 'Production' environment and a 'Staging' environment, each with their own set of configuration options. The `Environments` array allows you to specify different configurations for each environment, such as different container image tags or desired counts for the `api` component. These configuration options will override the default options defined in `AppConfig` and the individual packages for each component.

When you create your infrastructure using the `Terraform` application, the `AppConfig` object and the `Environments` array are used to generate the necessary infrastructure resources and configure them according to the specified options. This allows you to customize the configuration of your web application for different environments.

## Add a new environment

To add a new environment called **Testing** to your application that is accessible on `https://test.example.com/` and uses the Docker image tag `test-tag`, you can add a new object to the `Environments` array in your `environments.config.ts` file with the following properties:

```typescript
{
  name: 'Testing',
  resourceId: 'testing',
  subDomain: 'test',
  config: {
    pwa: { containerConfig: { imageTag: 'test-tag' } },
    admin: { containerConfig: { imageTag: 'test-tag' } },
    api: { containerConfig: { imageTag: 'test-tag' } },
  },
}
```

This new object includes a `config` object that overrides the image tags for the `pwa`, `admin`, and `api` components to use the `test-tag` image.

When you create your infrastructure using `Terraform` application, this new environment will be created with the specified configurations. The `subDomain` property determines the subdomain on which the environment will be hosted, so in this case the 'Testing' environment will be accessible at `https://test.example.com/`.

## Configuration overrides

To set the default number of `api` containers to 3 for all environments, except for the 'Testing' environment where you want only 1 container, you can update the `AppConfig` object in your `environments.config.ts` file as follows:

```tsx
export const AppConfig: Required<Environment['config']> = {
  api: {
    desiredCount: 3,
  },
  pwa: {},
  admin: {},
  postgres: {},
  reverseProxy: {},
};
```

This sets the `desiredCount` property for the `api` component to 3 in the default configuration.

To override the default `desiredCount` for the 'Testing' environment, you can add a `desiredCount` property to the `api` object in the `config` property of the 'Testing' environment object in the `Environments` array:

```typescript
{
  name: 'Testing',
  resourceId: 'testing',
  subDomain: 'test',
  config: {
    pwa: { containerConfig: { imageTag: 'test-tag' } },
    admin: { containerConfig: { imageTag: 'test-tag' } },
    api: {
      containerConfig: { imageTag: 'test-tag' },
      desiredCount: 1,
    },
  },
}
```

This will override the default `desiredCount` of 3 for the 'Testing' environment and set it to 1 instead.

When you create your infrastructure using CDKtf, the 'Testing' environment will have only 1 `api` container, while all other environments will have 3 `api` containers by default.

:::info

You can find more information about the available configuration options for a particular component by looking at the documentation for that component's package.

For example, if you are interested in the configuration options for the `api` component, you might look at the documentation for the `@trxn/terraform-service-api` package. This should provide information on the available configuration options and how to use them.

:::
