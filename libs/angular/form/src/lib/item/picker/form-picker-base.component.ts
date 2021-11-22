import { Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../base/form-item-base.component';

@Component({
  selector: 'tractr-form-picker-base',
  template: '',
})
export abstract class FormPickerBaseComponent extends FormItemBaseComponent<Date> {
  @Input() delayed = 200;

  @Input() placeholder = '';
}
