import { Component, Input, TemplateRef } from '@angular/core';
import { UntypedFormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'tractr-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.less'],
})
export class FormItemComponent {
  @Input() name!: string;

  @Input() label: string | undefined;

  @Input() errorTip:
    | string
    | TemplateRef<{ $implicit: UntypedFormControl | NgModel }>
    | undefined;

  @Input() status: 'error' | 'success' | 'validating' = 'validating';
}
