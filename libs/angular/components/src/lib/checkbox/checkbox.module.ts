import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { CheckboxComponent } from './checkbox.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzCheckboxModule];

@NgModule({
  imports: [...antModules, AngularToolsModule],
  declarations: [CheckboxComponent],
  exports: [...antModules, CheckboxComponent],
})
export class CheckboxModule {}
