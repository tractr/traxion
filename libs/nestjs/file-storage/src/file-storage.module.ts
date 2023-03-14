import { Module } from '@nestjs/common';

import { createFileStorageConfiguration } from './configs';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './file-storage.module-definition';
import { FileStorageService } from './services';

@Module({
  providers: [
    {
      provide: FILE_STORAGE_CONFIGURATION,
      useFactory: createFileStorageConfiguration,
      inject: [MODULE_OPTIONS_TOKEN],
    },
    FileStorageService,
  ],
  exports: [FileStorageService],
})
export class FileStorageModule extends ConfigurableModuleClass {}
