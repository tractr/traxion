import { Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../base/form-item-base.component';

@Component({
  selector: 'tractr-form-input-base',
  template: '',
})
export abstract class FormInputBaseComponent<
  Type extends string | number,
> extends FormItemBaseComponent<Type> {
  @Input() delayed = 200;
}
