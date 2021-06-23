import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { Region } from 'minio';

import { AwsRegions } from '../constants';
import { FileStorageConfiguration } from '../interfaces';
import { PresignedDownloadConfigurationDto } from './presigned-download-configuration.dto';
import { PresignedUploadConfigurationDto } from './presigned-upload-configuration';

export class FileStorageConfigurationDto implements FileStorageConfiguration {
  /**
   * File storage endpoint (ip or domain)
   */
  @IsString()
  endPoint!: string;

  /**
   * File storage access key
   */
  @IsString()
  accessKey!: string;

  /**
   * File storage secret key
   */
  @IsString()
  secretKey!: string;

  /**
   * Denote if SSL must be used
   */
  @IsBoolean()
  @IsOptional()
  useSSL = true;

  /**
   * Port to reach file storage
   */
  @IsInt()
  @IsOptional()
  port?: number;

  /**
   * Set this value to override
   * region cache
   */
  @IsIn(AwsRegions)
  @IsOptional()
  region?: Region;

  /**
   * Set this value to pass in a
   * custom transport
   */
  @IsString()
  @IsOptional()
  transport?: string;

  /**
   * Set this value to provide
   * x-amz-security-token (AWS S3 specific)
   */
  @IsString()
  @IsOptional()
  sessionToken?: string;

  /**
   * Set this value to override
   * default part size of 64MB
   * for multipart uploads
   */
  @IsString()
  @IsOptional()
  partSize?: number;

  /**
   * Set this value to override default
   * access behavior (path) for non AWS endpoints
   */
  @IsString()
  @IsOptional()
  pathStyle = true;

  /**
   * Default bucket that will be used
   * if no bucket is provided
   */
  @IsString()
  defaultBucket!: string;

  /**
   * Prefix for temporary files
   */
  @IsString()
  @IsOptional()
  temporaryPrefix = 'temp';

  /**
   * Time to live of temporary files (seconds)
   */
  @IsInt()
  @IsOptional()
  temporaryFilesTTL = 60 * 60 * 2;

  /**
   * Configuration for presigned uploads
   */
  presignedUpload: PresignedUploadConfigurationDto;

  /**
   * Configuration for presigned downloads
   */
  presignedDownload: PresignedDownloadConfigurationDto;
}
