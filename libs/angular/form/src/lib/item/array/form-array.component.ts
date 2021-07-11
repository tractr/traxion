import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    $implicit: FormGroup;
    state: Record<string, unknown>[] | undefined;
    index: number;
  }>;

  @Input() min = 0;

  @Input() max = Infinity;

  @Input() addLabel = 'add';

  @Input() addTpl?: TemplateRef<void>;

  @Input() removeTpl?: TemplateRef<void>;

  formArray!: FormArray;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  initControl(): FormArray {
    let controlsConfig = this.state?.map(() => new FormGroup({}));
    if (!controlsConfig) {
      controlsConfig = this.min <= 0 ? [] : [new FormGroup({})];
    }

    this.formArray = this.formBuilder.array(controlsConfig, [
      Validators.minLength(this.min),
      ...(this.max !== Infinity ? [Validators.maxLength(this.max)] : []),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ...(this.required ? [Validators.required] : []),
    ]);

    return this.formArray;
  }

  add(): void {
    this.formArray.push(new FormGroup({}));
  }

  remove(index: number): void {
    if (this.state) {
      this.state.splice(index, 1);
    }
    this.formArray.removeAt(index);
  }
}
