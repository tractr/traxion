/* eslint-disable import/no-extraneous-dependencies */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { FileStorageUploadButtonComponent } from './components/file-storage-upload-button/file-storage-upload-button.component';
import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

@NgModule({
  imports: [
    HttpClientModule,
    NzUploadModule,
    NzIconModule,
    NzButtonModule,
    CommonModule,
  ],
  declarations: [FileStorageUploadButtonComponent],
  providers: [FileStorageService],
  exports: [FileStorageUploadButtonComponent],
})
export class FileStorageModule {
  public static forRoot(
    configuration: FileStorageConfiguration,
  ): ModuleWithProviders<FileStorageModule> {
    const configurationDto = plainToClass(
      FileStorageConfigurationDto,
      configuration,
    );
    const errors = validateSync(configurationDto, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(
        `Invalid configuration for FileStorageModule: \n\n${errors.join('\n')}`,
      );
    }

    return {
      ngModule: FileStorageModule,
      providers: [
        {
          provide: FILE_STORAGE_CONFIGURATION,
          useValue: configuration,
        },
      ],
    };
  }
}
