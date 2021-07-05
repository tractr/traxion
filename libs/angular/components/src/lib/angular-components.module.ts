/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';

import { ButtonModule } from './button/button.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { InputModule } from './input/input.module';
import { SelectModule } from './select/select.module';

@NgModule({
  imports: [ButtonModule, InputModule, SelectModule, DatePickerModule],
  exports: [ButtonModule, InputModule, SelectModule, DatePickerModule],
})
export class AngularComponentsModule {}
