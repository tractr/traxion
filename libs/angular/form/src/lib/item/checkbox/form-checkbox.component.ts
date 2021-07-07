import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormItemBaseComponent } from '../base/form-item-base.component';

@Component({
  selector: 'tractr-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.less'],
})
export class FormCheckboxComponent extends FormItemBaseComponent<boolean> {
  @Input() delayed = 200;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  initControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.requiredTrue] : []),
    ]);
  }
}
