import { codepipeline, eventbridge, iam } from '@cdktf/provider-aws';

import { Repository } from './repository.interface';

export interface DeploymentTriggerEventComponentConfig {
  role: iam.IamRole;
  codepipeline: codepipeline.Codepipeline;
  repository: Repository;
}
export interface DeploymentTriggerEventComponentArtifacts {
  rule: eventbridge.CloudwatchEventRule;
  target: eventbridge.CloudwatchEventTarget;
}
