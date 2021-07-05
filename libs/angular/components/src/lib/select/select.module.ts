import { NgModule } from '@angular/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzSelectModule, NzRadioModule];

@NgModule({
  imports: [AngularToolsModule, ...antModules],
  declarations: [RadioComponent, SelectComponent],
  exports: [...antModules, RadioComponent, SelectComponent],
})
export class SelectModule {}
