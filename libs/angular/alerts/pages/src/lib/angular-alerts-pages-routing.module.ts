import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertsPageComponent } from './components';

const routes: Routes = [
  {
    path: 'en-cours',
    component: AlertsPageComponent,
  },
  {
    path: 'archives',
    component: AlertsPageComponent,
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
