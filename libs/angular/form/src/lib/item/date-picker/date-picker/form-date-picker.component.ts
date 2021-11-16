import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormDatePickerBaseComponent } from '../form-date-picker-base.component';

@Component({
  selector: 'tractr-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.less'],
})
export class FormDatePickerComponent extends FormDatePickerBaseComponent {
  /** Customize Format Date */
  @Input() format = 'dd-MM-yyyy';

  /** Show or not time in Datepicker
   * example nzFormat : "HH:mm:ss"
   */
  @Input() showTime: boolean | { nzFormat: string } = false;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  initControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }
}
