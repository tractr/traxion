import { NgModule } from '@angular/core';
import { AngularComponentsComponent } from './angular-components.component';
import { ButtonComponent } from './button/button.component';

import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    AngularComponentsComponent,
    ButtonComponent
  ],
  imports: [
    NzButtonModule
  ],
  exports: [
    AngularComponentsComponent,
    ButtonComponent,
    NzButtonModule
  ]
})
export class AngularComponentsModule { }
