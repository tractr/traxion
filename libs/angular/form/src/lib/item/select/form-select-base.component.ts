/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../base/form-item-base.component';

import { SelectOptionInterface } from '@tractr/angular-components';

@Component({
  selector: 'tractr-form-select-base',
  template: '',
})
export abstract class FormSelectBaseComponent<
  Type extends any,
> extends FormItemBaseComponent<SelectOptionInterface<Type>> {
  @Input() options: SelectOptionInterface<any>[] = [];

  @Input() delayed = 200;
}
