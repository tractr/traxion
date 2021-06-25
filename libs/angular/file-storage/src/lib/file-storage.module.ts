/* eslint-disable import/no-extraneous-dependencies */

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { FILE_STORAGE_CONFIGURATION } from './constants';
import { FileStorageConfigurationDto } from './dtos';
import { FileStorageConfiguration } from './interfaces';
import { FileStorageService } from './services';

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
