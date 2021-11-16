import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

import { AngularToolsModule } from '@tractr/angular-tools';

const antModules = [NzDatePickerModule, NzTimePickerModule];

@NgModule({
  imports: [AngularToolsModule, ...antModules],
  declarations: [DatePickerComponent, TimePickerComponent],
  exports: [...antModules, DatePickerComponent, TimePickerComponent],
})
export class PickerModule {}
