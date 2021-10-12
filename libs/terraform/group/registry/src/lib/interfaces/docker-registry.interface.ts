import { ConstructOptions } from 'constructs';

export interface RegistryGroupConfig extends ConstructOptions {
  appsPath: string[];
  projectCode: string;
}

export interface DockerRegistryComponentConfig extends ConstructOptions {
  projectCode: string;
  dockerizedAppsNames: string[];
}
