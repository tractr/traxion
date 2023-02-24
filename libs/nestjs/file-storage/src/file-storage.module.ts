import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { createFileStorageConfiguration } from './configs';
import { ConfigurableModuleClass } from './file-storage.module-definition';
import { FileStorageService } from './services';


@Global()
@Module({
  imports: [ConsoleModule],
  providers: [
    {
      provide: 'CONFIGURATION_TOKEN',
      useFactory: createFileStorageConfiguration,
      inject: ['MODULE_OPTIONS_TOKEN'],
    },
    FileStorageService
  ],
  exports: [FileStorageService],
})
export class FileStorageModule extends ConfigurableModuleClass {}