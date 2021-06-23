import { ClientOptions, Region } from 'minio';

import { PresignedDownloadConfiguration } from './presigned-download-configuration.interface';
import { PresignedUploadConfiguration } from './presigned-upload-configuration.interface';

export interface FileStorageConfiguration extends ClientOptions {
  /**
   * Set this value to override region cache
   */
  region?: Region;

  /**
   * Default bucket that will be used
   * if no bucket is provided
   */
  defaultBucket: string;

  /**
   * Prefix for temporary files
   */
  temporaryPrefix: string;

  /**
   * Time to live of temporary files (seconds)
   */
  temporaryFilesTTL: number;

  /**
   * Configuration for presigned uploads
   */
  presignedUpload: PresignedUploadConfiguration;

  /**
   * Configuration for presigned downloads
   */
  presignedDownload: PresignedDownloadConfiguration;
}
