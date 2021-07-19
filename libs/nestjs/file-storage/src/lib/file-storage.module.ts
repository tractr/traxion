import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { FileStorageCliService } from './cli';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { transformAndValidate } from '@tractr/common';
import { ModuleOptionsFactory } from '@tractr/nestjs-core';

@Global()
@Module({
  imports: [ConsoleModule],
  providers: [FileStorageService, FileStorageCliService],
  exports: [FileStorageService, FileStorageCliService],
})
export class FileStorageModule extends ModuleOptionsFactory<FileStorageConfiguration>(
  FILE_STORAGE_CONFIGURATION,
  transformAndValidate(FileStorageConfigurationDto),
) {}
