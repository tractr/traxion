import { Component } from '@angular/core';

import { DatePickerBaseComponent } from '../date-picker-base.component';

@Component({
  selector: 'tractr-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
})
export class DatePickerComponent extends DatePickerBaseComponent {}
