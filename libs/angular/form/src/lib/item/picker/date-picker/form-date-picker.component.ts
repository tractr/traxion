import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { FormPickerBaseComponent } from '../form-picker-base.component';

@Component({
  selector: 'tractr-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.less'],
})
export class FormDatePickerComponent extends FormPickerBaseComponent {
  /** Customize Format Date */
  @Input() format = 'dd-MM-yyyy';

  /** Show or not time in Datepicker
   * example nzFormat : "HH:mm:ss"
   */
  @Input() showTime: boolean | { nzFormat: string } = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  initControl(): UntypedFormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }
}
