import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { FormPickerBaseComponent } from '../form-picker-base.component';

@Component({
  selector: 'tractr-form-time-picker',
  templateUrl: './form-time-picker.component.html',
  styleUrls: ['./form-time-picker.component.less'],
})
export class FormTimePickerComponent extends FormPickerBaseComponent {
  /** Customize Format Date */
  @Input() format = 'dd-MM-yyyy';

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
