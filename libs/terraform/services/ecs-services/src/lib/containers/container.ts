import {
  ContainerConfig,
  ContainerDefinition,
  Environment,
  EnvironmentValue,
  ImageDefinition,
  MountPoint,
  Secret,
  SecretValue,
} from '../interfaces';
import type { ServiceComponent } from '../services';

export abstract class Container<T extends ContainerConfig = ContainerConfig> {
  constructor(
    protected readonly service: ServiceComponent,
    protected readonly config: T,
  ) {}

  getDefinition(): ContainerDefinition {
    return {
      name: this.config.name,
      image: `${this.getRepositoryName()}:${this.getImageTag()}`,
      networkMode: 'awsvpc', // Mandatory with Fargate
      cpu: this.config.cpu,
      memory: this.config.memory,
      dockerLabels: this.getDockerLabels(),
      mountPoints: this.getMountPoints(),
      environment: this.getEnvironments(),
      secrets: this.getSecrets(),
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': this.service.getLogsGroup(),
          'awslogs-region': this.service.getRegion(),
          'awslogs-stream-prefix': this.config.name,
        },
      },
    };
  }

  getImageDefinition(): ImageDefinition {
    const definition = this.getDefinition();
    return {
      name: definition.name,
      imageUri: definition.image,
    };
  }

  usePrivateImage(): boolean {
    return false;
  }

  protected getRepositoryName(): string {
    if (this.usePrivateImage()) {
      return this.service.getDockerApplication(this.getAppName())
        .repositoryName;
    }
    return this.getAppName();
  }

  getImageName(): string {
    if (this.usePrivateImage()) {
      return this.service.getDockerApplication(this.getAppName()).imageName;
    }
    return this.getAppName();
  }

  getImageTag(): string {
    return this.config.imageTag;
  }

  getMountPoints(): MountPoint[] {
    return [];
  }

  protected getEnvironments(): Environment[] {
    return this.extractEnvironmentsFromConfig().map(([name, value]) => {
      const computedValue =
        value.value instanceof Function
          ? value.value(this.service, this.config)
          : value.value;
      return { name, value: computedValue };
    });
  }

  protected getSecrets(): Secret[] {
    return this.extractSecretsFromConfig().map(([name, value]) => ({
      name,
      valueFrom: this.getSecretPath(value.secretKey ?? name),
    }));
  }

  /** Get key/values env pairs from environment object */
  protected extractEnvironmentsFromConfig(): [string, EnvironmentValue][] {
    return Object.entries(this.config.environments || {}).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([name, value]) => value.type === 'env',
    ) as [string, EnvironmentValue][];
  }

  /** Get key/values secret pairs from environment object */
  protected extractSecretsFromConfig(): [string, SecretValue][] {
    return Object.entries(this.config.environments || {}).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([name, value]) => value.type === 'secret',
    ) as [string, SecretValue][];
  }

  /** Returns env & secrets names */
  protected getEnvNames(): string[] {
    return Object.keys(this.config.environments || {});
  }

  protected getSecretPath(key: string): string {
    return `${this.service.getSecretsmanagerSecretArn()}:${key}::`;
  }

  /**
   * Returns the public Docker image, example: traefik, blacklabelops/volumerize
   * Or returns the private application name: api-backend
   */
  protected abstract getAppName(): string;

  protected getDockerLabels(): Record<string, string> {
    return {};
  }
}
