/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AngularComponentsComponent } from './angular-components.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [AngularComponentsComponent, ButtonComponent],
  imports: [NzButtonModule],
  exports: [AngularComponentsComponent, ButtonComponent, NzButtonModule],
})
export class AngularComponentsModule {}
