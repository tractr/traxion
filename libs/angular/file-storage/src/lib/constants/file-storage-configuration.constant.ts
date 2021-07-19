import { InjectionToken } from '@angular/core';

import { FileStorageConfiguration } from '../interfaces';

export const FILE_STORAGE_CONFIGURATION =
  new InjectionToken<FileStorageConfiguration>('FILE_STORAGE_CONFIGURATION');
