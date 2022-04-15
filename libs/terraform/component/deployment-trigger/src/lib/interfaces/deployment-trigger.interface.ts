import { codepipeline } from '@cdktf/provider-aws';

import { DeploymentTriggerEventComponentArtifacts } from './deployment-trigger-event.interface';
import { DeploymentTriggerRoleComponentArtifacts } from './deployment-trigger-role.interface';
import { Repository } from './repository.interface';

export interface DeploymentTriggerComponentConfig {
  codepipeline: codepipeline.Codepipeline;
  repositories: Repository[];
}
export interface DeploymentTriggerComponentArtifacts
  extends DeploymentTriggerRoleComponentArtifacts {
  events: DeploymentTriggerEventComponentArtifacts[];
}
