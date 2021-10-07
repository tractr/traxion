import { ServiceComponent } from '../services';

export interface ContainerDefinition {
  name: string;
  image: string;
  entryPoint?: string[];
  essential?: boolean;
  cpu?: number;
  memory?: number;
  networkMode: string;
  logConfiguration: {
    logDriver: string;
    options: {
      'awslogs-group': string;
      'awslogs-region': string;
      'awslogs-stream-prefix': string;
    };
  };
  environment?: Environment[];
  secrets?: Secret[];
  portMappings?: {
    containerPort: number;
    hostPort?: number;
    protocol?: 'tcp' | 'udp';
  }[];
  mountPoints?: MountPoint[];
  dockerLabels?: Record<string, string>;
}

export interface Environment {
  name: string;
  value: string;
}

export interface Secret {
  name: string;
  valueFrom: string;
}

export interface ImageDefinition {
  name: string;
  imageUri: string;
}

export interface MountPoint {
  sourceVolume: string;
  containerPath: string;
}

export type EnvironmentCb<C extends ContainerConfig = ContainerConfig> = (
  service: ServiceComponent,
  config: C,
) => string;

export type EnvironmentValue = {
  type: 'env';
  value: string | EnvironmentCb;
};
export type SecretValue = {
  type: 'secret';
  secretKey?: string;
};
export type EnvironmentOrSecretValue = EnvironmentValue | SecretValue;

export interface ContainerInternalConfig {
  name: string;
}

export interface ContainerPublicConfig {
  imageTag: string;
  cpu?: number;
  memory?: number;
  environments?: Record<string, EnvironmentOrSecretValue>;
}

export type ContainerConfig = ContainerInternalConfig & ContainerPublicConfig;
