import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlertDetailsComponent,
  AlertListArchivedComponent,
  AlertListInProgressComponent,
} from './components';

import { AngularAlertsUiModule } from '@cali/angular-alerts-ui';
import { AngularFeedbacksFeaturesModule } from '@cali/angular-feedbacks-features';

@NgModule({
  imports: [
    CommonModule,
    AngularAlertsUiModule,
    AngularFeedbacksFeaturesModule,
  ],
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
