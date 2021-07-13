import { Controller, Get, Query } from '@nestjs/common';

import {
  GetPresignedDownloadUrlQueryDto,
  GetPresignedUploadUrlQueryDto,
} from '../dtos';
import { FileStorageService } from '../services';

@Controller('file-storage')
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  /**
   * Get presigned upload url
   */
  @Get('upload')
  getPresignedUploadUrl(@Query() queryDto: GetPresignedUploadUrlQueryDto) {
    const { mimeType, customBucket } = queryDto;
    return this.fileStorageService.getPresignedUploadUrl(
      mimeType,
      customBucket,
    );
  }

  /**
   * Get presigned download url
   */
  @Get('download')
  getPresignedDownloadUrl(@Query() queryDto: GetPresignedDownloadUrlQueryDto) {
    const { file, customBucket } = queryDto;
    return this.fileStorageService.getPresignedDownloadUrl(file, customBucket);
  }
}
