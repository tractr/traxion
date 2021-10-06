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

export type EnvironmentCb<Config = unknown> = {
  name: string;
  value: (service: ServiceComponent, config: Config) => string;
};

export interface Secret {
  name: string;
  valueFrom: string;
}

export interface SecretMap {
  name: string;
  key: string;
}

export interface ImageDefinition {
  name: string;
  imageUri: string;
}

export interface MountPoint {
  sourceVolume: string;
  containerPath: string;
}

export interface ContainerPrivateConfig {
  name: string;
}

export interface ContainerPublicConfig {
  imageTag: string;
  cpu?: number;
  memory?: number;
  secrets?: (string | SecretMap)[];
  environments?: (Environment | EnvironmentCb)[];
}

export type ContainerConfig = ContainerPrivateConfig & ContainerPublicConfig;
