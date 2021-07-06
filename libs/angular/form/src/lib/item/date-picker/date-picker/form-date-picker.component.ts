import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormDatePickerBaseComponent } from '../form-date-picker-base.component';

@Component({
  selector: 'tractr-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.less'],
})
export class FormDatePickerComponent extends FormDatePickerBaseComponent {
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
