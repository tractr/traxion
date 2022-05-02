import { iam, secretsmanager } from '@cdktf/provider-aws';

export interface ExecutionRoleComponentConfig {
  secret: secretsmanager.SecretsmanagerSecret;
}
export interface ExecutionRoleComponentArtifacts {
  role: iam.IamRole;
}
