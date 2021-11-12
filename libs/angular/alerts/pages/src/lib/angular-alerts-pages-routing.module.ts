import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertComponent, AlertsComponent } from './components';

const routes: Routes = [
  {
    path: 'en-cours',
    component: AlertsComponent,
  },
  {
    path: 'archives',
    component: AlertsComponent,
  },
  {
    path: ':id',
    component: AlertComponent,
  },
  {
    path: '',
    redirectTo: 'en-cours',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularAlertsPagesRoutingModule {}
