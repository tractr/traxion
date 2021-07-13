import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormItemBaseComponent } from '../../base/form-item-base.component';

@Component({
  selector: 'tractr-form-model-select',
  template: '',
})
export abstract class FormModelSelectComponent extends FormItemBaseComponent<
  Record<string, unknown>
> {
  @Input() delayed = 200;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  getControl(): FormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);
  }

  abstract getList(): Promise<Record<string, unknown>[]>;
}
