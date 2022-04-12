import { DeploymentTriggerEventComponentArtifacts } from './deployment-trigger-event.interface';
import { DeploymentTriggerRoleComponentArtifacts } from './deployment-trigger-role.interface';

export interface Repository {
  repositoryName: string;
  imageTag: string;
}
export interface DeploymentTriggerComponentConfig {
  codepipelineArn: string;
  repositories: Repository[];
}
export interface DeploymentTriggerComponentArtifacts
  extends DeploymentTriggerRoleComponentArtifacts {
  events: DeploymentTriggerEventComponentArtifacts[];
}
