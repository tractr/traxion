import { IsArray, IsInt, IsMimeType, IsOptional } from 'class-validator';

export class PresignedUploadConfigurationDto {
  /**
   * List of allowewd mime types for presigned uploads
   */
  @IsArray()
  @IsMimeType({ each: true })
  @IsOptional()
  allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  /**
   * Minimum size of file (in bits)
   */
  @IsInt()
  @IsOptional()
  minFileSize = 1024;

  /**
   * Maximum size of file (in bits)
   */
  @IsInt()
  @IsOptional()
  maxFileSize = 10485760;

  /**
   * Default validity duration of presigned upload link
   * (in seconds)
   */
  @IsInt()
  @IsOptional()
  defaultValidity = 300;
}
