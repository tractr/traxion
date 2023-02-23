import { IsInt, IsMimeType } from 'class-validator';

import { TransformStringToInt } from '@trxn/common';

export class GetPresignedUploadUrlQueryDto {
  /**
   * Mime type of the file that will be uploaded
   */
  @IsMimeType()
  mimeType!: string;

  /**
   * File size of the file that will be uploaded
   */
  @IsInt()
  @TransformStringToInt()
  fileSize!: number;
}
