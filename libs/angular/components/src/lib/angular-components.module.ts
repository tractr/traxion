/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [NzButtonModule],
  exports: [ButtonComponent, NzButtonModule],
})
export class AngularComponentsModule {}
