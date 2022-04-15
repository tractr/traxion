import { codepipeline, iam } from '@cdktf/provider-aws';

export interface DeploymentTriggerRoleComponentConfig {
  codepipeline: codepipeline.Codepipeline;
}

export interface DeploymentTriggerRoleComponentArtifacts {
  role: iam.IamRole;
  policy: iam.IamPolicy;
}
