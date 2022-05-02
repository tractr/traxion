import { s3 } from '@cdktf/provider-aws';

export interface S3ComponentConfig {
  publicRead?: boolean;
  allowUpload?: {
    origins: string[];
  };
}
export interface S3ComponentArtifacts {
  bucket: s3.S3Bucket;
}
