import { NgModule } from '@angular/core';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FormComponent } from './form.component';
import {
  FormArrayComponent,
  FormButtonComponent,
  FormCheckboxComponent,
  FormCheckboxGroupComponent,
  FormDatePickerComponent,
  FormInputNumberComponent,
  FormInputStringComponent,
  FormItemComponent,
  FormRadioComponent,
  FormSelectComponent,
  FormTimePickerComponent,
} from './item';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  imports: [
    AngularToolsModule,
    AngularComponentsModule,
    NzIconModule.forRoot([PlusOutline]),
  ],
  declarations: [
    FormInputStringComponent,
    FormInputNumberComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
    FormTimePickerComponent,
    FormCheckboxGroupComponent,
    FormCheckboxComponent,
    FormArrayComponent,
  ],
  exports: [
    NzIconModule,
    FormInputStringComponent,
    FormInputNumberComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
    FormTimePickerComponent,
    FormCheckboxGroupComponent,
    FormCheckboxComponent,
    FormArrayComponent,
  ],
})
export class AngularFormModule {}
