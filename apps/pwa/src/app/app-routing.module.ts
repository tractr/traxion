import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoleculeConnectedComponent } from './molecules/molecule-connected/molecule-connected.component';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { MoleculeNotConnectedComponent } from './molecules/molecule-not-connected/molecule-not-connected.component';

import {
  IsLoggedGuard,
  IsNotLoggedGuard,
} from '@tractr/angular-authentication';

const routes: Routes = [
  {
    path: 'connected',
    component: MoleculeConnectedComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'not-connected',
    component: MoleculeNotConnectedComponent,
    canActivate: [IsNotLoggedGuard],
  },
  { path: '', component: MoleculeHomeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
