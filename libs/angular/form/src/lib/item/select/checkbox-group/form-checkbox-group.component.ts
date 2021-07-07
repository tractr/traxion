import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ItemStatusInterface } from '../../base/form-item-base.component';
import { FormSelectBaseComponent } from '../form-select-base.component';

@Component({
  selector: 'tractr-form-checkbox-group',
  templateUrl: './form-checkbox-group.component.html',
  styleUrls: ['./form-checkbox-group.component.less'],
})
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export class FormCheckboxGroupComponent extends FormSelectBaseComponent<any> {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  initControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }

  getStatus(control: AbstractControl | null): ItemStatusInterface {
    if (!control?.value) return 'validating';
    return control.errors ? 'error' : 'success';
  }
}
