import { DockerRegistryComponentArtifacts } from './docker-registry-component.interface';

export interface RegistryGroupConfig {
  appsPath: string[];
  projectCode: string;
}
export type RegistryGroupArtifacts = DockerRegistryComponentArtifacts;
