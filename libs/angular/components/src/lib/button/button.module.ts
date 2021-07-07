import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ButtonComponent } from './button.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzButtonModule];

@NgModule({
  imports: [...antModules, AngularToolsModule],
  declarations: [ButtonComponent],
  exports: [...antModules, ButtonComponent],
})
export class ButtonModule {}
