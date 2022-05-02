import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { LoginFormComponent } from './features/login-form.component';
import { LoginFormUiComponent } from './ui/login-form-ui/login-form-ui.component';
import { UserInfosUiComponent } from './ui/user-infos-ui/user-infos-ui.component';
import { ApiCollapseUiComponent } from './ui/api-collapse-ui/api-collapse-ui.component';

const antModules = [
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzSpinModule,
  NzTabsModule,
  NzRadioModule,
  NzNotificationModule,
  NzFormModule,
  NzCollapseModule,
];

@NgModule({
  declarations: [
    DemoComponent,
    LoginFormComponent,
    LoginFormUiComponent,
    UserInfosUiComponent,
    ApiCollapseUiComponent,
  ],
  imports: [
    CommonModule,
    ...antModules,
    DemoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DemoComponent, ...antModules],
})
export class DemoModule {}
