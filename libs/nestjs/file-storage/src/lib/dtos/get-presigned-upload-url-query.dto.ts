import { IsMimeType, IsOptional, IsString } from 'class-validator';

export class GetPresignedUploadUrlQueryDto {
  /**
   * Mime type of the file that will be uploaded
   */
  @IsMimeType()
  mimeType!: string;

  /**
   * Specify a custom bucket. Else default bucket
   * will be used
   */
  @IsString()
  @IsOptional()
  customBucket?: string;
}
