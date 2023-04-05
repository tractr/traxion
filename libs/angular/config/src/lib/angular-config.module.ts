import { ModuleWithProviders, NgModule } from '@angular/core';

import { ANGULAR_CONFIG_OPTIONS } from './angular-config.constant';
import { AngularConfigOptions } from './interfaces';
import { createAngularConfigModuleOptions } from './services/angular-options.factory';

@NgModule({})
export class AngularConfigModule {
  static forRoot(
    options: Partial<AngularConfigOptions>,
  ): ModuleWithProviders<AngularConfigModule> {
    return {
      ngModule: AngularConfigModule,
      providers: [
        {
          provide: ANGULAR_CONFIG_OPTIONS,
          useFactory: createAngularConfigModuleOptions(options),
        },
      ],
    };
  }
}
