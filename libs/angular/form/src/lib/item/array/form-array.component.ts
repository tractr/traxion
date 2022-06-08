import { Component, Input, TemplateRef } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { FormItemBaseComponent } from '../base/form-item-base.component';

@Component({
  selector: 'tractr-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.less'],
})
export class FormArrayComponent extends FormItemBaseComponent<
  Record<string, unknown>[]
> {
  @Input() content!: TemplateRef<{
    $implicit: UntypedFormGroup;
    state: Record<string, unknown>[] | undefined;
    index: number;
  }>;

  @Input() min = 0;

  @Input() max = Infinity;

  @Input() addLabel = 'add';

  @Input() addTpl?: TemplateRef<void>;

  @Input() removeTpl?: TemplateRef<void>;

  formArray!: UntypedFormArray;

  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  initControl(): UntypedFormArray {
    let controlsConfig = this.state?.map(() => new UntypedFormGroup({}));
    if (!controlsConfig) {
      controlsConfig = this.min <= 0 ? [] : [new UntypedFormGroup({})];
    }

    this.formArray = this.formBuilder.array(controlsConfig, [
      Validators.minLength(this.min),
      ...(this.max !== Infinity ? [Validators.maxLength(this.max)] : []),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required && this.min > 0 ? [Validators.required] : []),
    ]);

    return this.formArray;
  }

  add(): void {
    this.formArray.push(new UntypedFormGroup({}));
  }

  remove(index: number): void {
    if (this.state) {
      this.state.splice(index, 1);
    }
    this.formArray.removeAt(index);
  }
}
