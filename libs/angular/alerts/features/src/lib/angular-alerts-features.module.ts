import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlertDetailsComponent,
  AlertListArchivedComponent,
  AlertListInProgressComponent,
} from './components';

import { AngularAlertsUiModule } from '@cali/angular-alerts-ui';

@NgModule({
  imports: [CommonModule, AngularAlertsUiModule],
  declarations: [
    AlertDetailsComponent,
    AlertListInProgressComponent,
    AlertListArchivedComponent,
  ],
  exports: [
    AlertDetailsComponent,
    AlertListInProgressComponent,
    AlertListArchivedComponent,
  ],
})
export class AngularAlertsFeaturesModule {}
