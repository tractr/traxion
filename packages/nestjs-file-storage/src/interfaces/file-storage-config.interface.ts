import { ClientOptions } from 'minio';

import { PresignedDownloadOptions } from './presigned-download-options.interface';
import { PresignedUploadOptions } from './presigned-upload-options.interface';

export interface FileStorageConfig extends ClientOptions {
  region?: string;
  buckets: string[];
  routePrefix: string;
  temporaryPrefix: string;
  permanentPrefix: string;
  temporaryFilesTTL: number;

  presignedUploadDefaults: PresignedUploadOptions;

  presignedDownloadDefaults: PresignedDownloadOptions;
}
