import { IsOptional, IsString } from 'class-validator';

export class GetPresignedDownloadUrlQueryDto {
  /**
   * Name of the file to download
   */
  @IsString()
  file!: string;

  /**
   * Specify a custom bucket. Else default bucket
   * will be used
   */
  @IsString()
  @IsOptional()
  customBucket?: string;
}
