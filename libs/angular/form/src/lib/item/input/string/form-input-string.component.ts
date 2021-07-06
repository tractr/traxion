import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormInputBaseComponent } from '../form-input-base.component';

@Component({
  selector: 'tractr-form-input-string',
  templateUrl: './form-input-string.component.html',
  styleUrls: ['./form-input-string.component.less'],
})
export class FormInputStringComponent extends FormInputBaseComponent<string> {
  inputType: 'text' | 'email' | 'password' = 'text';

  autocomplete: 'on' | 'off';

  constructor(private formBuilder: FormBuilder) {
    super();

    if (this.subtype === 'email') this.inputType = 'email';
    if (this.subtype === 'password') this.inputType = 'password';

    this.autocomplete = this.inputType === 'password' ? 'on' : 'off';
  }

  initControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }
}
