/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormSelectBaseComponent } from '../form-select-base.component';

@Component({
  selector: 'tractr-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less'],
})
export class FormSelectComponent extends FormSelectBaseComponent<any> {
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
