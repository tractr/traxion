import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MoleculeConnectedComponent } from './molecules/molecule-connected/molecule-connected.component';
import { MoleculeHomeComponent } from './molecules/molecule-home/molecule-home.component';
import { MoleculeNotConnectedComponent } from './molecules/molecule-not-connected/molecule-not-connected.component';

import {
  IsLoggedGuard,
  IsNotLoggedGuard,
} from '@tractr/angular-authentication';
import { HasRoleGuard } from '@tractr/angular-casl';

const routes: Routes = [
  {
    path: 'connected',
    component: MoleculeConnectedComponent,
    canActivate: [IsLoggedGuard, HasRoleGuard],
    data: {
      redirectTo: 'redirect-after-have-not-the-role',
      roles: { some: ['admin', 'test'] },
    },
  },
  {
    path: 'not-connected',
    component: MoleculeNotConnectedComponent,
    canActivate: [IsNotLoggedGuard],
  },
  {
    path: 'redirect-after-have-not-the-role',
    component: MoleculeHomeComponent,
  },
  {
    path: '',
    component: MoleculeHomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
