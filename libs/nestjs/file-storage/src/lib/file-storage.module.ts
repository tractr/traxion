import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { FileStorageCliService } from './cli';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { ModuleOptionsHelper, validateFactory } from '@tractr/nestjs-core';

@Global()
@Module({
  imports: [ConsoleModule],
  providers: [FileStorageService, FileStorageCliService],
  exports: [FileStorageService, FileStorageCliService],
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
