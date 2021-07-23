import { ModuleWithProviders, NgModule } from '@angular/core';
import { Ability, PureAbility } from '@casl/ability';
import { AbilityModule } from '@casl/angular';

import { CASL_MODULE_OPTIONS } from './constants';
import { CaslOptions } from './interfaces';
import { CaslUpdateAbilitiesService } from './services';

import { AsyncOptions, ModuleOptionsFactory } from '@tractr/angular-tools';

@NgModule({
  imports: [AbilityModule],
  providers: [
    {
      provide: CaslUpdateAbilitiesService,
      useClass: CaslUpdateAbilitiesService,
      deps: [CASL_MODULE_OPTIONS, Ability],
    },
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
  ],
  exports: [AbilityModule],
})
export class AngularCaslModule extends ModuleOptionsFactory<CaslOptions>(
  CASL_MODULE_OPTIONS,
) {
  constructor(private caslUpdate: CaslUpdateAbilitiesService) {
    super();
  }

  static register(
    options: CaslOptions,
  ): ModuleWithProviders<AngularCaslModule> {
    return super.register(options);
  }

  static forRoot(options: CaslOptions): ModuleWithProviders<AngularCaslModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<CaslOptions>,
  ): ModuleWithProviders<AngularCaslModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<CaslOptions>,
  ): ModuleWithProviders<AngularCaslModule> {
    return super.forRootAsync(options);
  }
}
