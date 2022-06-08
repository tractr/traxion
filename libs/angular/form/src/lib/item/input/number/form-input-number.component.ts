import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { FormInputBaseComponent } from '../form-input-base.component';

@Component({
  selector: 'tractr-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrls: ['./form-input-number.component.less'],
})
export class FormInputNumberComponent extends FormInputBaseComponent<number> {
  /** Min value accepted */
  @Input() min = -Infinity;

  /** Max value accepted */
  @Input() max = Infinity;

  /** Interval between two values */
  @Input() step = 1;

  /** Ant input's size */
  @Input() size: NzSizeLDSType = 'default';

  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  initControl(): UntypedFormControl {
    return this.formBuilder.control(this.state, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
      ...(this.min !== -Infinity ? [Validators.min(this.min)] : []),
      ...(this.max !== Infinity ? [Validators.max(this.max)] : []),
    ]);
  }
}
