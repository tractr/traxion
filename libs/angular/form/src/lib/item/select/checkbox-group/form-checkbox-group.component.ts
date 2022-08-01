import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { ItemStatusInterface } from '../../base/form-item-base.component';
import { FormSelectBaseComponent } from '../form-select-base.component';

@Component({
  selector: 'tractr-form-checkbox-group',
  templateUrl: './form-checkbox-group.component.html',
  styleUrls: ['./form-checkbox-group.component.less'],
})
export class FormCheckboxGroupComponent extends FormSelectBaseComponent {
  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  initControl(): UntypedFormControl {
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
