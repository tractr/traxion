import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './test/form/form.component';

const routes: Routes = [
  {
    path: 'test',
    component: FormComponent,
  },
  {
    path: '',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
