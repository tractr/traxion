/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { ModuleOptionsFactory } from '@tractr/angular-tools';
import { transformAndValidate } from '@tractr/common';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [FileStorageService],
  exports: [],
})
export class FileStorageModule extends ModuleOptionsFactory<FileStorageConfiguration>(
  FILE_STORAGE_CONFIGURATION,
  transformAndValidate(FileStorageConfigurationDto),
) {}
