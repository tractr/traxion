import {
  ContainerConfig,
  ContainerDefinition,
  Environment,
  ImageDefinition,
  MountPoint,
  Secret,
  SecretMap,
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
      secrets: this.getMappedSecrets(),
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
    const environments = this.config.environments ?? [];

    return environments.map((env) => {
      if (env.value instanceof Function) {
        return {
          ...env,
          value: env.value(this.service, this.config),
        };
      }

      return env as Environment;
    });
  }

  protected getSecrets(): (string | SecretMap)[] {
    const secrets = this.config.secrets ?? [];
    return secrets;
  }

  protected getSecretsNames(): string[] {
    return this.getSecrets().map((secret) => {
      if (typeof secret === 'string') {
        return secret;
      }
      return secret.name;
    });
  }

  protected getMappedSecrets(): Secret[] {
    return this.getSecrets().map((secret: string | SecretMap) =>
      typeof secret === 'string'
        ? {
            name: secret,
            valueFrom: this.getSecretPath(secret),
          }
        : {
            name: secret.name,
            valueFrom: this.getSecretPath(secret.key),
          },
    );
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
