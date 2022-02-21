import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import {
  MoleculeConnectedComponent,
  MoleculeHomeComponent,
  MoleculeNotConnectedComponent,
} from './molecules';

import {
  IsLoggedGuard,
  IsNotLoggedGuard,
} from '@tractr/angular-authentication';
import { HasRoleGuard } from '@tractr/angular-casl';

const routes: Routes = [
  // {
  //   path: 'connected',
  //   component: MoleculeConnectedComponent,
  //   canActivate: [IsLoggedGuard, HasRoleGuard],
  //   data: {
  //     redirectTo: 'redirect-after-have-not-the-role',
  //     roles: { some: ['admin', 'test'] },
  //   },
  // },
  // {
  //   path: 'not-connected',
  //   component: MoleculeNotConnectedComponent,
  //   canActivate: [IsNotLoggedGuard],
  // },
  // {
  //   path: 'redirect-after-have-not-the-role',
  //   component: MoleculeHomeComponent,
  // },
  // {
  //   path: 'home',
  //   component: MoleculeHomeComponent,
  //   pathMatch: 'full',
  // },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
