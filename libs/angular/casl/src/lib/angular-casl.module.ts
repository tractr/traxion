import { ModuleWithProviders, NgModule } from '@angular/core';
import { Ability, PureAbility } from '@casl/ability';
import { AbilityModule } from '@casl/angular';

import { CASL_MODULE_OPTIONS } from './constants';
import { HasRoleGuard } from './guards';
import { CaslOptions } from './interfaces';
import { CaslUpdateAbilitiesService } from './services';

import { AsyncOptions, ModuleOptionsFactory } from '@trxn/angular-tools';

@NgModule({
  imports: [AbilityModule],
  providers: [
    CaslUpdateAbilitiesService,
    HasRoleGuard,
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
  ],
  exports: [AbilityModule],
})
export class AngularCaslModule extends ModuleOptionsFactory<CaslOptions>(
  CASL_MODULE_OPTIONS,
) {
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

  constructor(private casl: CaslUpdateAbilitiesService) {
    super();

    this.casl.onInit();
  }
}
