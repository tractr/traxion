/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormSelectBaseComponent } from '../form-select-base.component';

@Component({
  selector: 'tractr-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.less'],
})
export class FormRadioComponent extends FormSelectBaseComponent<any> {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  getControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }
}
