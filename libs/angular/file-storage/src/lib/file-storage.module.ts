/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { transformAndValidate } from '@tractr/common';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [FileStorageService],
  exports: [],
})
export class FileStorageModule {
  public static forRoot(
    configuration: FileStorageConfiguration,
  ): ModuleWithProviders<FileStorageModule> {
    const validatedConfiguration = transformAndValidate(
      FileStorageConfigurationDto,
    )(configuration);

    return {
      ngModule: FileStorageModule,
      providers: [
        {
          provide: FILE_STORAGE_CONFIGURATION,
          useValue: validatedConfiguration,
        },
      ],
    };
  }
}
