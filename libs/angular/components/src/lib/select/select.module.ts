import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';

import { AngularToolsModule } from '@trxn/angular-tools';

const antModules = [NzSelectModule, NzRadioModule, NzCheckboxModule];

@NgModule({
  imports: [AngularToolsModule, ...antModules],
  declarations: [RadioComponent, SelectComponent, CheckboxGroupComponent],
  exports: [
    ...antModules,
    RadioComponent,
    SelectComponent,
    CheckboxGroupComponent,
  ],
})
export class SelectModule {}
