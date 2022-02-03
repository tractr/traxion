export interface RegistryGroupConfig {
  appsPath: string[];
  projectCode: string;
}

export interface DockerRegistryComponentConfig {
  projectCode: string;
  dockerizedAppsNames: string[];
}
