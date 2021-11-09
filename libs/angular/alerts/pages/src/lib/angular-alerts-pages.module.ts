import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularAlertsPagesRoutingModule } from './angular-alerts-pages-routing.module';
import { AlertsArchivedComponent } from './components';

import { AngularAlertsFeaturesModule } from '@cali/angular-alerts-features';

@NgModule({
  imports: [
    CommonModule,
    AngularAlertsPagesRoutingModule,
    AngularAlertsFeaturesModule,
  ],
  exports: [AngularAlertsPagesRoutingModule],
  declarations: [AlertsArchivedComponent],
})
export class AngularAlertsPagesModule {}
