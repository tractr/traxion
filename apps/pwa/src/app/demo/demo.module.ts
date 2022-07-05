import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeInvisibleOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { LoginFormComponent } from './features/login-form.component';
import { ApiCollapseUiComponent } from './ui/api-collapse-ui/api-collapse-ui.component';
import { LoginFormUiComponent } from './ui/login-form-ui/login-form-ui.component';
import { UserInfosUiComponent } from './ui/user-infos-ui/user-infos-ui.component';

const icons: IconDefinition[] = [
  EyeInvisibleOutline,
  PlusOutline,
  LockOutline,
  UserOutline,
];

const antModules = [
  NzButtonModule,
  NzIconModule.forChild(icons),
  NzLayoutModule,
  NzSpinModule,
  NzTabsModule,
  NzRadioModule,
  NzNotificationModule,
  NzFormModule,
  NzCollapseModule,
  NzInputModule,
  NzInputNumberModule,
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
  exports: [DemoComponent],
})
export class DemoModule {}
