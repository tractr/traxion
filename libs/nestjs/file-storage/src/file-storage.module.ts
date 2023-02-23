import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { FileStorageCliService } from './cli';
import { ConfigurableModuleClass } from './file-storage.module-definition';
import { FileStorageService } from './services';


@Global()
@Module({
  imports: [ConsoleModule],
  providers: [FileStorageService, FileStorageCliService],
  exports: [FileStorageService, FileStorageCliService],
})
export class FileStorageModule extends ConfigurableModuleClass {}
