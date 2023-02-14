---
id: ecs-components
title: Understanding the ECS components
sidebar_label: ECS components
---

# Understanding the ECS components

All ECS services are based on the library `@trxn/terraform-service-ecs`.

The `@trxn/terraform-service-ecs` library is a set of abstractions and helpers to define ECS services in AWS using CDKtf and Terraform. It includes classes such as `Component` and `Container` which are used to define the ECS task definition and the containers that should be run in the task, as well as other utilities such as volume management and deployment strategies. This library can be used to build ECS services in a standardized and modular way, making it easier to develop and manage multiple ECS services within a single application.

## Service component

The `ServiceComponent` class is an abstract class that represents an ECS service in AWS. It is used to define the properties and configurations of an ECS service, as well as to create and manage the resources needed to run the service. The class is designed to be extended by other classes, which can customize the behavior and configuration of the service as needed. It provides a number of methods that can be overridden to customize the behavior of the service, such as `getContainers`, `createSecurityGroup`, `createTaskDefinition`, `createDiscoveryService`, and `createEcsService`. It also includes a number of optional properties and methods that can be used to customize the service further, such as `getSecurityGroupConfig`, `getEcsTaskDefinitionConfig`, `createVolumeComponents`, and `createDeployment`.

### Backend service component

The `BackendServiceComponent` is a subclass of the `ServiceComponent` class and is meant to be used as the backend service for another service. It is designed to be used in situations where one service is used as a dependency for another service, such as a Postgres service being used as the backend for an API service. The `BackendServiceComponent` class includes a `getIngressPorts` abstract method that must be implemented by subclasses, as well as a `shouldAccessItself` method that determines whether the service should be able to access itself via its security group ingress rules. The `BackendServiceComponent` also includes a `getSecurityGroupConfig` method that can be overridden to customize the security group configuration for the service.

## Containers

The `Container` class is a class that represents an ECS container. It contains information such as image name and tag, port, mount points, and environment variables. It is meant to be extended and overridden in subclasses to provide specific configuration for different types of containers.

The containers have two levels of properties. Properties, which are defined in the class but cannot vary between several environments, such as the name of the image. The configurations, which are provided in the constructor. These configurations can change depending on the environment, such as the image tag.

### Image name and tag

The `usePrivateImage` method allows the subclass to specify whether to use a private or public image for the container. If set to `true`, the image should be found on a public repositiory, such as DockerHub. If set to `false`, the image should be available on ECR and a deployment pipeline will be triggered every time a new image is pushed to this repository (accordingly to the image tag).

The configuration `imageName` is the name of the image to use. If the container uses a private image, this is the name of a workspace’s application containing a `Dockerfile`. If the container uses a public image, this is the name of the image without the tag. For example `traefik` or `blacklabelops/volumerize`.

The configuration `imageTag` is also available to specify the tag of the image to use.

### Persistent volumes

The `getMountPoints` method returns the mount points for the container, which specify the persistent storage volumes that are attached to the container. This storage is provided by Amazon Elastic File System (EFS) volumes.

This is a sample of the mount points returned by `getMountPoints`:

```typescript
[
  {
    containerPath: '/path/on/container',
    sourceVolume: 'my-volume',
  },
  {
    containerPath: '/another/path/on/container',
    sourceVolume: 'another-volume',
    preventDestroy: true,
    enableBackups: true,
  },
]
```

## Environments

Environments are used to set environment variables for a container. These environment variables can be used by the application running inside the container to configure its behavior.

For example, if the application running inside the container is a web server, the `PORT` environment variable might be used to specify which port the server should listen on. Similarly, the `POSTGRES_DB` environment variable might be used to specify the name of the PostgreSQL database that the application should connect to.

Environment are passed with the container’s configuration in the constructor. Environments can be mapped in several ways:

```typescript
{
	environments: {
		POSTGRES_DB: 'api',
		POSTGRES_USER: Secret(),
		POSTGRES_PASSWORD: Secret('PG_PASS'),
		POSTGRES_HOST: (service) => service.getServiceDomainName('postgres'),
	},
}
```

1. **Static mapping**: You can pass a static value to an environment variable by simply providing a key-value pair. For example: `{ POSTGRES_DB: 'api' }` In this case, the environment variable `POSTGRES_DB` will always be set to the value `api` for the container.
2. **Secret mapping**: You can retrieve a secret from AWS Secrets Manager and pass it to an environment variable by using the `Secret()` function. For example: `{ POSTGRES_USER: Secret() }` In this case, the environment variable `POSTGRES_USER` will be injected on startup with the value of the secret stored in AWS Secrets Manager with the key `POSTGRES_USER`.
3. **Secret mapping with custom key**: If the key of the secret in AWS Secrets Manager is different from the environment variable name, you can specify the key by passing it as an argument to the `Secret()` function. For example: `{ POSTGRES_USER: Secret('POSTGRES_USER_OTHER_KEY') }`. In this case, the environment variable `POSTGRES_USER` will be injected on startup with the value of the secret stored in AWS Secrets Manager with the key `POSTGRES_USER_OTHER_KEY`.
4. **Callback mapping**: You can use a callback function to dynamically determine the value of an environment variable. For example: `{ POSTGRES_HOST: (service) => service.getServiceDomainName('postgres') }` In this case, on build time, the callback function `service.getServiceDomainName('postgres')` will be executed to determine the value of the environment variable `POSTGRES_HOST`. The `service` object is an instance of the `ServiceComponent` class.

:::info

The `getServiceDomainName` method is a method of the `ServiceComponent` class that returns the private domain name of a service in the VPC. It takes the name of the service as an argument and returns a string. This method uses the AWS Service Discovery service to discover the private domain name of the service.

:::

:::info

The Amazon ECS service discovery service is a feature that enables Amazon ECS tasks to discover and connect to other tasks or services in an Amazon ECS cluster. With service discovery, Amazon ECS tasks can make use of service discovery namespaces to find and connect to other tasks or services within a cluster. Service discovery namespaces are logical DNS namespaces that are created within Amazon ECS and are used to resolve service discovery names to IP addresses and port numbers. Service discovery namespaces can be linked to a cluster and a service, and tasks within the service can use the service discovery namespace to discover other tasks or services within the cluster.

:::

## Backend container

The `BackendContainer` class is a subclass of the `Container` class that is meant to be used as a backend service for other services.

The method `getPort` in the `BackendContainer` class returns the port that the container will expose to the outside. It is typically used to specify the port that other services can use to connect to this container.

The method `shouldAccessItself` which allows the container to access itself by adding the `self` attribute on the security group ingress rules.

### Http container

The `HttpContainer` class is a subclass of the `BackendContainer` class that is meant to be used as a service that exposes an HTTP server.

The `getPort` method in the `HttpContainer` class is used to specify which port the container is listening on for HTTP traffic. This is used by the reverse proxy Traefik to route incoming traffic to the appropriate container.

## Execution role

The `ExecutionRoleComponent` is a class that extends the `AwsComponent` class from the `@trxn/terraform-component-aws` library. It is used to create an IAM execution role that can be used by ECS tasks to perform AWS API calls on the user's behalf. This allows the ECS tasks to have the necessary permissions to access resources in the user's AWS account, such as reading and writing to S3 buckets or accessing a database. The `ExecutionRoleComponent` class has methods to add permissions to the role, such as the ability to read and write to specific S3 buckets or access specific resources in a VPC. It can also be used to specify the trusted entities that can assume this role, such as the user's ECS tasks.

The class `ExecutionRoleComponent` creates an IAM role with the name `role` and the assume role policy that allows Amazon ECS tasks to assume this role. It also creates an inline policy with the name `policy` that allows read access to Secrets Manager resources specified in the `secret.arn` field in the configuration object. It also creates any additional inline policies specified in the `createAdditionalInlinePolicies` method.
