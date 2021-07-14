import { Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../base/form-item-base.component';

@Component({
  selector: 'tractr-form-date-picker-base',
  template: '',
})
export abstract class FormDatePickerBaseComponent extends FormItemBaseComponent<Date> {
  @Input() delayed = 200;

  @Input() placeholder = '';
}
