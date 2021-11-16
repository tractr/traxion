import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LostPasswordPageComponent } from './components';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { PasswordService } from './services';

const routes: Routes = [
  {
    path: 'password/lost',
    component: LostPasswordPageComponent,
    data: {
      title: 'Lost password',
    },
  },
  {
    path: 'password/reset/:id/:code',
    component: ResetPasswordPageComponent,
    data: {
      title: 'Reset password',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [PasswordService],
  exports: [RouterModule],
})
export class AngularAuthenticationPasswordRoutingModule {}