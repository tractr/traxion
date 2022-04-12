import { iam } from '@cdktf/provider-aws';

export interface DeploymentTriggerRoleComponentConfig {
  codepipelineArn: string;
}

export interface DeploymentTriggerRoleComponentArtifacts {
  role: iam.IamRole;
  policy: iam.IamPolicy;
}
