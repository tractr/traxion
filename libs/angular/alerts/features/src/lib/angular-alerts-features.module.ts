import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlertListArchivedComponent,
  AlertListInProgressComponent,
} from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertListInProgressComponent, AlertListArchivedComponent],
  exports: [AlertListInProgressComponent, AlertListArchivedComponent],
})
export class AngularAlertsFeaturesModule {}
