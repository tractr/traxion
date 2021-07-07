import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { InputNumberComponent } from './number/input-number.component';
import { InputStringComponent } from './string/input-string.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzInputModule, NzInputNumberModule];

@NgModule({
  imports: [...antModules, AngularToolsModule],
  declarations: [InputStringComponent, InputNumberComponent],
  exports: [...antModules, InputStringComponent, InputNumberComponent],
})
export class InputModule {}
