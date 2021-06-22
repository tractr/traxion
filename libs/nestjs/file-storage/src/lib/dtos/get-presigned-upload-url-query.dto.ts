import { IsOptional, IsString } from 'class-validator';

export class GetPresignedUploadUrlQueryDto {
  @IsString()
  @IsOptional()
  bucket?: string;
}
