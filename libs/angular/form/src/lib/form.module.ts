import { NgModule } from '@angular/core';

import { FormComponent } from './form.component';
import {
  FormButtonComponent,
  FormCheckboxComponent,
  FormCheckboxGroupComponent,
  FormDatePickerComponent,
  FormInputNumberComponent,
  FormInputStringComponent,
  FormItemComponent,
  FormRadioComponent,
  FormSelectComponent,
} from './item';

import { AngularComponentsModule } from '@tractr/angular-components';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  imports: [AngularToolsModule, AngularComponentsModule],
  declarations: [
    FormInputStringComponent,
    FormInputNumberComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
    FormCheckboxGroupComponent,
    FormCheckboxComponent,
  ],
  exports: [
    FormInputStringComponent,
    FormInputNumberComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
    FormCheckboxGroupComponent,
    FormCheckboxComponent,
  ],
})
export class AngularFormModule {}
