import {
  ContainerInternalConfig,
  ContainerPublicConfig,
} from './container.interface';

export interface HttpContainerPublicConfig extends ContainerPublicConfig {
  path: {
    prefix: string;
    stripPrefix: boolean;
  };
  auth?: {
    user: string;
    passwordHash: string;
  };
}

export type HttpContainerConfig = ContainerInternalConfig &
  HttpContainerPublicConfig;
