import { IsString } from 'class-validator';

export class GetPresignedDownloadUrlQueryDto {
  /**
   * Name of the file to download
   */
  @IsString()
  file!: string;
}
