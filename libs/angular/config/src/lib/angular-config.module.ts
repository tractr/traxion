import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  ANGULAR_CONFIG_OPTIONS,
  ANGULAR_CONFIG_SERVICE,
} from './angular-config.constant';
import { ANGULAR_DEFAULTS_OPTIONS } from './configs';
import { AngularConfigOptions } from './interfaces';
import { AngularConfigServiceFactory } from './services';

import { AsyncOptions, ModuleOptionsFactory } from '@trxn/angular-tools';

@NgModule({
  providers: [
    {
      provide: ANGULAR_CONFIG_SERVICE,
      useFactory: AngularConfigServiceFactory,
      deps: [ANGULAR_CONFIG_OPTIONS],
    },
  ],
})
export class AngularConfigModule extends ModuleOptionsFactory<AngularConfigOptions>(
  ANGULAR_CONFIG_OPTIONS,
  ANGULAR_DEFAULTS_OPTIONS,
) {
  static register(
    options?: Partial<AngularConfigOptions>,
  ): ModuleWithProviders<AngularConfigModule> {
    return super.register(options);
  }

  static forRoot(
    options?: Partial<AngularConfigOptions>,
  ): ModuleWithProviders<AngularConfigModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<AngularConfigOptions>,
  ): ModuleWithProviders<AngularConfigModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<AngularConfigOptions>,
  ): ModuleWithProviders<AngularConfigModule> {
    return super.forRootAsync(options);
  }
}
