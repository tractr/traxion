import { ClientOptions } from 'minio';

import { PresignedDownloadConfiguration } from './presigned-download-configuration.interface';
import { PresignedUploadConfiguration } from './presigned-upload-configuration.interface';

export interface FileStorageConfiguration extends ClientOptions {
  region?: string;
  defaultBucket: string;
  routePrefix: string;
  temporaryPrefix: string;
  temporaryFilesTTL: number;

  presignedUpload: PresignedUploadConfiguration;

  presignedDownload: PresignedDownloadConfiguration;
}
