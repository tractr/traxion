import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/angular-tools';

import { ANGULAR_REXT_CONFIGURATION } from './generated/constants';
import { AngularRextConfiguration } from './generated/interfaces';
import {
  AlertFeedbackService,
  AlertService,
  CameraService,
  CameraStatusService,
  ClientService,
  ItemCategoryService,
  ShopDepartmentService,
  ShopSectionService,
  ShopService,
  UserService,
} from './generated/services';
import { AlertWithCurrentFeedbackService } from './services';

@NgModule({
  providers: [
    AlertWithCurrentFeedbackService,
    AlertService,
    AlertFeedbackService,
    CameraService,
    CameraStatusService,
    ClientService,
    ItemCategoryService,
    ShopService,
    ShopDepartmentService,
    ShopSectionService,
    UserService,
  ],
})
export class AngularRextModule extends ModuleOptionsFactory<
  AngularRextConfiguration,
  AngularRextConfiguration
>(ANGULAR_REXT_CONFIGURATION) {
  static register(
    options: AngularRextConfiguration,
  ): ModuleWithProviders<AngularRextModule> {
    return super.register(options);
  }

  static forRoot(
    options: AngularRextConfiguration,
  ): ModuleWithProviders<AngularRextModule> {
    return super.forRoot(options);
  }

  static registerAsync(
    options: AsyncOptions<AngularRextConfiguration, AngularRextConfiguration>,
  ): ModuleWithProviders<AngularRextModule> {
    return super.registerAsync(options);
  }

  static forRootAsync(
    options: AsyncOptions<AngularRextConfiguration, AngularRextConfiguration>,
  ): ModuleWithProviders<AngularRextModule> {
    return super.forRootAsync(options);
  }
}
