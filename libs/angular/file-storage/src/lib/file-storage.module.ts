/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { AngularComponentsModule } from '@trxn/angular-components';
import { AsyncOptions, ModuleOptionsFactory } from '@trxn/angular-tools';

@NgModule({
  imports: [HttpClientModule, AngularComponentsModule, NzUploadModule],
  declarations: [UploadButtonComponent],
  providers: [FileStorageService],
  exports: [UploadButtonComponent],
})
export class FileStorageModule extends ModuleOptionsFactory<
  FileStorageConfiguration,
  FileStorageConfiguration
>(FILE_STORAGE_CONFIGURATION, FileStorageConfigurationDto) {
  static register(
    options?: FileStorageConfiguration,
  ): ModuleWithProviders<FileStorageModule> {
    return super.register(options);
  }

  static forRoot(
    options?: FileStorageConfiguration,
  ): ModuleWithProviders<FileStorageModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<FileStorageConfiguration, FileStorageConfiguration>,
  ): ModuleWithProviders<FileStorageModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<FileStorageConfiguration, FileStorageConfiguration>,
  ): ModuleWithProviders<FileStorageModule> {
    return super.forRootAsync(options);
  }
}
