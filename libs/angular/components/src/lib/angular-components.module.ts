/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';

import { ButtonModule } from './button/button.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { InputModule } from './input/input.module';
import { ModelModule } from './model/model.module';
import { SelectModule } from './select/select.module';

@NgModule({
  imports: [
    ButtonModule,
    InputModule,
    SelectModule,
    DatePickerModule,
    CheckboxModule,
    ModelModule,
  ],
  exports: [
    ButtonModule,
    InputModule,
    SelectModule,
    DatePickerModule,
    CheckboxModule,
    ModelModule,
  ],
})
export class AngularComponentsModule {}
