import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { ConfigurableModuleClass } from './file-storage.module-definition';
import { FileStorageService } from './services';


@Global()
@Module({
  imports: [ConsoleModule],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule extends ConfigurableModuleClass {}
