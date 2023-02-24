import { ClientOptions as MinioClientOptions, Region } from 'minio';

import { PresignedDownloadConfiguration } from './presigned-download-configuration.interface';
import { PresignedUploadConfiguration } from './presigned-upload-configuration.interface';


export interface FileStorageConfigurationPrivate extends MinioClientOptions {
  /**
   * File storage endpoint (ip or domain)
   */
  endPoint: string;

  /**
   * File storage access key
   */
  accessKey: string;

  /**
   * File storage secret key
   */
  secretKey: string;

  /**
   * Denote if SSL must be used
   */
  useSSL: boolean;

  /**
   * Port to reach file storage
   */
  port: number;

  /**
   * Set this value to override region cache
   */
  region?: Region;

  /**
   * Set this value to pass in a custom transport
   */
  transport?: string;

  /**
   * Set this value to provide x-amz-security-token (AWS S3 specific)
   */
  sessionToken?: string;

  /**
   * Set this value to override default part size of 64MB for multipart uploads
   */
  partSize?: number;

  /**
   * Set this value to override default access behavior (path) for non AWS endpoints
   */
  pathStyle?: boolean;

  /**
   * Default bucket that will be used if no bucket is provided
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
  presignedDownload: PresignedDownloadConfiguration
}
