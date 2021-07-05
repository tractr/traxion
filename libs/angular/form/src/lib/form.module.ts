import { NgModule } from '@angular/core';

import { FormComponent } from './form.component';
import {
  FormButtonComponent,
  FormDatePickerComponent,
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
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
  ],
  exports: [
    FormInputStringComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormItemComponent,
    FormButtonComponent,
    FormComponent,
    FormDatePickerComponent,
  ],
})
export class AngularFormModule {}
