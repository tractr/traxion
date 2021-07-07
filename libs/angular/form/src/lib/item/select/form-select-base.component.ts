import { Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../base/form-item-base.component';

import { SelectOptionInterface } from '@tractr/angular-components';

@Component({
  selector: 'tractr-form-select-base',
  template: '',
})
export abstract class FormSelectBaseComponent<
  Type = unknown,
> extends FormItemBaseComponent<
  SelectOptionInterface<Type> | SelectOptionInterface<Type>[]
> {
  @Input() options: SelectOptionInterface<Type>[] = [];

  @Input() delayed = 200;
}
