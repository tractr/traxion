import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    /**
     * Routing to dashboard
     */
    path: 'tableau-de-bord',
    component: AppComponent,
  },
  {
    path: 'statistiques',
    component: AppComponent,
  },
  {
    path: 'alertes',
    loadChildren: () =>
      import('@cali/angular-alerts-pages').then(
        ({ AngularAlertsPagesModule }) => AngularAlertsPagesModule,
      ),
  },
  {
    path: 'utilisateurs',
    component: AppComponent,
  },
  {
    path: 'mon-compte',
    component: AppComponent,
  },
  {
    path: 'deconnexion',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: 'tableau-de-bord',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
