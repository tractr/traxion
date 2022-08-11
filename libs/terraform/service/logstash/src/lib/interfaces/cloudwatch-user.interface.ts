import { iam } from '@cdktf/provider-aws';

export type CloudwatchUserComponentConfig = Record<string, never>;
export interface CloudwatchUserComponentArtifacts {
  user: iam.IamUser;
  policy: iam.IamPolicy;
  accessKey: iam.IamAccessKey;
}
