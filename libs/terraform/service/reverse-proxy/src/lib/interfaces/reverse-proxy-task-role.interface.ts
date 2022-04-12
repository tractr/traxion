import { iam } from '@cdktf/provider-aws';

export type ReverseProxyTaskRoleComponentConfig = Record<string, never>;
export interface ReverseProxyTaskRoleComponentArtifacts {
  role: iam.IamRole;
}
