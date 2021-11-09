import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertsArchivedComponent } from './components/alerts-archived/alerts-archived.component';

const routes: Routes = [
  {
    path: 'archives',
    component: AlertsArchivedComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularAlertsPagesRoutingModule {}
