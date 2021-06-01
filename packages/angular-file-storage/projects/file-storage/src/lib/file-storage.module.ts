/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FILE_STORAGE_CONFIG } from './constants';
import { FileStorageConfig } from './interfaces';
import { FileStorageService } from './services';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [],
  providers: [FileStorageService],
  exports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
})
export class FileStorageModule {
  public static forRoot(
    config: FileStorageConfig,
  ): ModuleWithProviders<FileStorageModule> {
    return {
      ngModule: FileStorageModule,
      providers: [
        {
          provide: FILE_STORAGE_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
