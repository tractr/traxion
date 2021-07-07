import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { DatePickerComponent } from './date-picker/date-picker.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzDatePickerModule];

@NgModule({
  imports: [AngularToolsModule, ...antModules],
  declarations: [DatePickerComponent],
  exports: [...antModules, DatePickerComponent],
})
export class DatePickerModule {}
