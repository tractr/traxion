/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

import { validateFactory } from '@tractr/nestjs-core';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [FileStorageService],
  exports: [HttpClientModule],
})
export class FileStorageModule {
  public static forRoot(
    configuration: FileStorageConfiguration,
  ): ModuleWithProviders<FileStorageModule> {
    const validatedConfiguration = validateFactory(FileStorageConfigurationDto)(
      configuration,
    );
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
