import { s3 } from '@cdktf/provider-aws';

import { S3ComponentArtifacts } from '@tractr/terraform-component-s3';
import { S3UserComponentArtifacts } from '@tractr/terraform-component-s3-user';

export interface FileStorageComponentConfig {
  additionalReadOnlyS3Buckets?: s3.S3Bucket[];
  s3PublicRead?: boolean;
  s3AllowUpload?: {
    origins: string[];
  };
}
export interface FileStorageComponentArtifacts
  extends S3ComponentArtifacts,
    S3UserComponentArtifacts {}
