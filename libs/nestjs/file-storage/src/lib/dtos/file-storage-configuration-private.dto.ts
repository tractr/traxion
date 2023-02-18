import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ClientOptions as MinioClientOptions, Region } from 'minio';

import { PresignedDownloadConfigurationDto } from './presigned-download-configuration.dto';
import { PresignedUploadConfigurationDto } from './presigned-upload-configuration';
import { AwsRegions } from '../constants';

import { getDefaults } from '@trxn/common';

export class FileStorageConfigurationPrivateDto implements MinioClientOptions {
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
  useSSL!: boolean;

  /**
   * Port to reach file storage
   */
  @IsInt()
  port!: number;

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
  @IsBoolean()
  @IsOptional()
  pathStyle?: boolean;

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
  @ValidateNested()
  @Type(() => PresignedUploadConfigurationDto)
  presignedUpload: PresignedUploadConfigurationDto = getDefaults(
    PresignedUploadConfigurationDto,
  );

  /**
   * Configuration for presigned downloads
   */
  @ValidateNested()
  @Type(() => PresignedDownloadConfigurationDto)
  presignedDownload: PresignedDownloadConfigurationDto = getDefaults(
    PresignedDownloadConfigurationDto,
  );
}
