import { Component, Input } from '@angular/core';

import { PickerBaseComponent } from '../picker-base.component';

@Component({
  selector: 'tractr-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.less'],
})
export class TimePickerComponent extends PickerBaseComponent {
  /** Customize Format Date */
  @Input() format = 'HH:mm:ss';
}
