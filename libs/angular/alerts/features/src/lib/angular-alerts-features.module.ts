import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertListArchivedComponent } from './alert-list-archived/alert-list-archived.component';
import { AlertListInProgressComponent } from './alert-list-in-progress/alert-list-in-progress.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertListInProgressComponent, AlertListArchivedComponent],
})
export class AngularAlertsSmartModule {}
