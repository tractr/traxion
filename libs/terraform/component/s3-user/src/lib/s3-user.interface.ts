import { iam } from '@cdktf/provider-aws';

export type S3BucketAccess = 'read' | 'write';
export interface S3BucketDetails {
  access: S3BucketAccess;
  arn: string;
}
export interface S3UserComponentConfig {
  s3Buckets: S3BucketDetails[];
}
export interface S3UserComponentArtifacts {
  user: iam.IamUser;
  policy: iam.IamPolicy;
  accessKey: iam.IamAccessKey;
}
