import {
  ContainerConfig,
  ContainerDefinition,
  Environment,
  EnvironmentCb,
  EnvironmentLikeValue,
  EnvironmentOrSecretValue,
  EnvironmentValue,
  ImageDefinition,
  MountPoint,
  Secret,
  SecretLikeValue,
  SecretValue,
} from '../interfaces';
import type { ServiceComponent } from '../services';
import { SECRET_ENVIRONMENT } from './helpers';

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
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return Object.entries(this.config.environments || {})
      .filter(([name, value]) => this.isEnvironmentValueLike(value))
      .map(([name, value]) => [
        name,
        this.convertToEnvironmentValue(value as EnvironmentLikeValue),
      ]);
    /* eslint-enable @typescript-eslint/no-unused-vars */
  }

  /** Denote if a value can be treated as an environment */
  protected isEnvironmentValueLike(
    value: EnvironmentOrSecretValue,
  ): value is EnvironmentLikeValue {
    return (
      typeof value === 'string' ||
      typeof value === 'function' ||
      (typeof value === 'object' && value.type === 'env')
    );
  }

  /** Wrap value to an EnvironmentValue object if necessary */
  protected convertToEnvironmentValue(
    value: EnvironmentLikeValue,
  ): EnvironmentValue {
    if (typeof value === 'string' || typeof value === 'function')
      return { type: 'env', value };
    return value;
  }

  /** Get key/values secret pairs from environment object */
  protected extractSecretsFromConfig(): [string, SecretValue][] {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return Object.entries(this.config.environments || {})
      .filter(([name, value]) => this.isSecretValueLike(value))
      .map(([name, value]) => [
        name,
        this.convertToSecretValue(value as SecretLikeValue),
      ]);
    /* eslint-enable @typescript-eslint/no-unused-vars */
  }

  /** Denote if a value can be treated as a secret */
  protected isSecretValueLike(
    value: EnvironmentOrSecretValue,
  ): value is SecretLikeValue {
    return (
      value === SECRET_ENVIRONMENT ||
      (typeof value === 'object' && value.type === 'secret')
    );
  }

  /** Wrap value to an SecretValue object if necessary */
  protected convertToSecretValue(value: SecretLikeValue): SecretValue {
    if (typeof value === 'object' && value.type === 'secret') {
      return value;
    }
    return { type: 'secret' };
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
