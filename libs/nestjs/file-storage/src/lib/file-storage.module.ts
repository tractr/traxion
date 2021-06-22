import { Global, Module } from '@nestjs/common';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos/file-storage-configuration.dto';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { ModuleOptionsHelper, validateFactory } from '@tractr/nestjs-core';

@Global()
@Module({
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule extends ModuleOptionsHelper<FileStorageConfiguration>(
  FILE_STORAGE_CONFIGURATION,
) {
  static register(options: FileStorageConfiguration) {
    const validatedOptions = validateFactory(FileStorageConfigurationDto)(
      options,
    );
    return super.register(validatedOptions);
  }
}
