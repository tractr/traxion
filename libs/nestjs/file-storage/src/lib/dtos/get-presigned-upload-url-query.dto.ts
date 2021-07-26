import { IsMimeType } from 'class-validator';

export class GetPresignedUploadUrlQueryDto {
  /**
   * Mime type of the file that will be uploaded
   */
  @IsMimeType()
  mimeType!: string;
}
