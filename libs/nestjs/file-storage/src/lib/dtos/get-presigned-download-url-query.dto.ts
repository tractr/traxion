import { IsOptional, IsString } from 'class-validator';

export class GetPresignedDownloadUrlQueryDto {
  @IsString()
  file!: string;

  @IsString()
  @IsOptional()
  bucket?: string;
}
