import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { FileStorageCliService } from './cli';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationPrivateDto } from './dtos';
import { FileStorageConfigurationPublic } from './interfaces';
import { FileStorageService } from './services';

import { ModuleOptionsFactory } from '@trxn/nestjs-core';

@Global()
@Module({
  imports: [ConsoleModule],
  providers: [FileStorageService, FileStorageCliService],
  exports: [FileStorageService, FileStorageCliService],
})
export class FileStorageModule extends ModuleOptionsFactory<
  FileStorageConfigurationPrivateDto,
  FileStorageConfigurationPublic
>(FILE_STORAGE_CONFIGURATION, FileStorageConfigurationPrivateDto) {}
