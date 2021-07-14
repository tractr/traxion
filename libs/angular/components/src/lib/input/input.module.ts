import { NgModule } from '@angular/core';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { InputNumberComponent } from './number/input-number.component';
import { InputStringComponent } from './string/input-string.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzInputModule, NzInputNumberModule];

@NgModule({
  imports: [
    ...antModules,
    NzIconModule.forRoot([EyeInvisibleOutline]),
    AngularToolsModule,
  ],
  declarations: [InputStringComponent, InputNumberComponent],
  exports: [
    ...antModules,
    NzIconModule,
    InputStringComponent,
    InputNumberComponent,
  ],
})
export class InputModule {}
