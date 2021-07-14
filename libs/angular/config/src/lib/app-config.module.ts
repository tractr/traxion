import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { APP_CONFIG_OPTIONS, APP_CONFIG_SERVICE } from './app-config.constant';
import { APP_DEFAULTS_OPTIONS } from './configs';
import { AppConfigOptions } from './interfaces';
import { appConfigServiceFactory } from './services';

@NgModule({
  imports: [CommonModule],
})
export class AppConfigModule {
  static forRoot(options?: Partial<AppConfigOptions>) {
    return {
      ngModule: AppConfigModule,
      providers: [
        {
          provide: APP_CONFIG_OPTIONS,
          useValue: { ...APP_DEFAULTS_OPTIONS, ...options },
        },
        {
          provide: APP_CONFIG_SERVICE,
          useFactory: appConfigServiceFactory,
          deps: [HttpClient, APP_CONFIG_OPTIONS],
        },
      ],
    };
  }
}
