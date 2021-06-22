import { Controller, Get, Query } from '@nestjs/common';

import {
  GetPresignedDownloadUrlQueryDto,
  GetPresignedUploadUrlQueryDto,
} from '../dtos';
import { FileStorageService } from '../services';

@Controller('file-storage')
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  @Get('upload')
  getPresignedUploadUrl(@Query() queryDto: GetPresignedUploadUrlQueryDto) {
    const { bucket } = queryDto;
    return this.fileStorageService.getPresignedUploadUrl(bucket);
  }

  @Get('download')
  getPresignedDownloadUrl(@Query() queryDto: GetPresignedDownloadUrlQueryDto) {
    const { file, bucket } = queryDto;
    return this.fileStorageService.getPresignedDownloadUrl(file, bucket);
  }
}
