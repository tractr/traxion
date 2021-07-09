import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LostPasswordComponent } from './components';
import { PasswordService } from './services';

const routes: Routes = [
  {
    path: 'lost-password',
    component: LostPasswordComponent,
    data: {
      title: 'Lost password',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [PasswordService],
  exports: [RouterModule],
})
export class AngularAuthentificationPasswordRoutingModule {}
