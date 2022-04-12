import { S3ComponentArtifacts } from '@tractr/terraform-component-s3';
import { S3UserComponentArtifacts } from '@tractr/terraform-component-s3-user';

export interface FileStorageComponentConfig {
  additionalReadOnlyS3Arns?: string[];
  s3PublicRead?: boolean;
  s3AllowUpload?: {
    origins: string[];
  };
}
export interface FileStorageComponentArtifacts
  extends S3ComponentArtifacts,
    S3UserComponentArtifacts {}
