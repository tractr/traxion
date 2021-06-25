import { IsInt, IsOptional } from 'class-validator';

export class PresignedDownloadConfigurationDto {
  /**
   * Default validity duration of presigned download link
   * (in seconds)
   */
  @IsInt()
  @IsOptional()
  defaultValidity = 300;
}
