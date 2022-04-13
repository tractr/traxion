import { iam } from '@cdktf/provider-aws';

export interface ExecutionRoleComponentConfig {
  secretsmanagerSecretArn: string;
}
export interface ExecutionRoleComponentArtifacts {
  role: iam.IamRole;
}
