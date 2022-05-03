export interface DockerApplication {
  repositoryName: string;
  imageName: string;
}

export type DockerApplications = Record<string, DockerApplication>;

export interface DockerRegistryComponentConfig {
  projectCode: string;
  dockerizedAppsNames: string[];
}

export interface DockerRegistryComponentArtifacts {
  applicationsMap: DockerApplications;
}
