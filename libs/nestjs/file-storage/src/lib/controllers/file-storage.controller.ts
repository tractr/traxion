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
    const { mimeType, fileSize } = queryDto;
    return this.fileStorageService.getPresignedUploadUrl(mimeType, fileSize);
  }

  /**
   * Get presigned download url
   */
  @Get('download')
  getPresignedDownloadUrl(@Query() queryDto: GetPresignedDownloadUrlQueryDto) {
    const { file } = queryDto;
    return this.fileStorageService.getPresignedDownloadUrl(file);
  }
}
