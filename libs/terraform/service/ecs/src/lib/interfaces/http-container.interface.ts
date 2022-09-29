import {
  ContainerInternalConfig,
  ContainerPublicConfig,
} from './container.interface';

export interface HttpContainerPathPrefixConfig {
  prefix: string;
  stripPrefix: boolean;
}

export interface HttpContainerPublicConfig extends ContainerPublicConfig {
  path: HttpContainerPathPrefixConfig | HttpContainerPathPrefixConfig[];
  auth?: {
    user: string;
    passwordHash: string;
  };
}

export type HttpContainerConfig = ContainerInternalConfig &
  HttpContainerPublicConfig;
