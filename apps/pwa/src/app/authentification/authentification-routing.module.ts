import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LogoutComponent } from './components';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SessionService } from './services/session.service';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      title: 'Sign In',
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
  imports: [RouterModule.forChild(routes)],
  providers: [NzMessageService, SessionService],
  exports: [RouterModule],
})
export class AuthentificationRoutingModule {}
