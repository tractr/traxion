import { iam } from '@cdktf/provider-aws';

export type LogstashTaskRoleComponentConfig = Record<string, never>;
export interface LogstashTaskRoleComponentArtifacts {
  role: iam.IamRole;
}
