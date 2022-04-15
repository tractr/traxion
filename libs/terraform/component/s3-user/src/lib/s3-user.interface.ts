import { iam, s3 } from '@cdktf/provider-aws';

export type S3BucketAccess = 'read' | 'write';
export interface S3BucketDetails {
  access: S3BucketAccess;
  bucket: s3.S3Bucket;
}
export interface S3UserComponentConfig {
  s3Buckets: S3BucketDetails[];
}
export interface S3UserComponentArtifacts {
  user: iam.IamUser;
  policy: iam.IamPolicy;
  accessKey: iam.IamAccessKey;
}
