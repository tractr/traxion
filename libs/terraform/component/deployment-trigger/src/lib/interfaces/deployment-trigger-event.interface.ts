import { eventbridge } from '@cdktf/provider-aws';

export interface DeploymentTriggerEventComponentConfig {
  roleArn: string;
  codepipelineArn: string;
  repositoryName: string;
  repositoryTag: string;
}
export interface DeploymentTriggerEventComponentArtifacts {
  rule: eventbridge.CloudwatchEventRule;
  target: eventbridge.CloudwatchEventTarget;
}
