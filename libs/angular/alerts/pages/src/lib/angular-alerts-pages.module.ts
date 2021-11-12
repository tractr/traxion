import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AngularAlertsPagesRoutingModule } from './angular-alerts-pages-routing.module';
import { AlertComponent, AlertsComponent } from './components';

import { AngularAlertsFeaturesModule } from '@cali/angular-alerts-features';
import { AngularCommonUiModule } from '@cali/angular-common-ui';

@NgModule({
  imports: [
    CommonModule,
    AngularCommonUiModule,
    TranslateModule,
    AngularAlertsPagesRoutingModule,
    AngularAlertsFeaturesModule,
  ],
  exports: [AngularAlertsPagesRoutingModule],
  declarations: [AlertsComponent, AlertComponent],
})
export class AngularAlertsPagesModule {}
