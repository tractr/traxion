import { Global, Module } from '@nestjs/common';


import { FILE_STORAGE_DEFALT_CONFIG } from './config';
import { FILE_STORAGE_MODULE_CONFIG } from './constants';
import { FileStorageConfig } from './interfaces';
import { FileStorageService } from './services';

import { ModuleOptionsHelper } from '@tractr/nestjs-core';

@Global()
@Module({
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule extends ModuleOptionsHelper<FileStorageConfig>(
  FILE_STORAGE_MODULE_CONFIG,
  FILE_STORAGE_DEFALT_CONFIG,
) {}
