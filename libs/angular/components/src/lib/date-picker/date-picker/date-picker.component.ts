import { Component, Input } from '@angular/core';

import { DatePickerBaseComponent } from '../date-picker-base.component';

@Component({
  selector: 'tractr-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
})
export class DatePickerComponent extends DatePickerBaseComponent {
  /** Customize Format Date */
  @Input() format = 'dd-MM-yyyy';

  /** Show or not time in Datepicker
   * example nzFormat : "HH:mm:ss"
   */
  @Input() showTime: boolean | { nzFormat: string } = false;
}
