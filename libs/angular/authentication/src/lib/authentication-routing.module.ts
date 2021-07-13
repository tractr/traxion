import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginComponent, LogoutComponent } from './components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [NzMessageService],
  exports: [RouterModule],
})
export class AngularAuthenticationRoutingModule {}
