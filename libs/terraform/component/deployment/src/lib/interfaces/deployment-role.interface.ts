import { iam, s3 } from '@cdktf/provider-aws';

export interface DeploymentRoleComponentConfig {
  storeS3Bucket: s3.S3Bucket;
}
export interface DeploymentRoleComponentArtifacts {
  role: iam.IamRole;
}
