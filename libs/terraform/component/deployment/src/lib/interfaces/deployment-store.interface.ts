import { s3 } from '@cdktf/provider-aws';

export type DeploymentStoreComponentConfig = Record<string, never>;
export interface DeploymentStoreComponentArtifacts {
  bucket: s3.S3Bucket;
}
