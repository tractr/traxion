import { iam } from '@cdktf/provider-aws';

export interface DeploymentRoleComponentConfig {
  storeS3Arn: string;
}
export interface DeploymentRoleComponentArtifacts {
  role: iam.IamRole;
}
