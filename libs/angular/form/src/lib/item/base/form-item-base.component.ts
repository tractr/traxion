import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tractr-form-item-base',
  template: '',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class FormItemBaseComponent<Type extends any>
  implements OnInit
{
  @Input() form: FormGroup = new FormGroup({});

  @Input() name = 'base';

  @Input() subtype?: string;

  @Input() label?: string;

  @Input() state?: Type;

  @Input() required = true;

  ngOnInit(): void {
    this.form.addControl(this.name, this.getControl());
  }

  abstract getControl(): AbstractControl;

  getValue(): Type | undefined {
    const value = this.form.get(this.name)?.value;

    return value ? (value as Type) : value;
  }

  setValue(value: Type | undefined): void {
    this.form.get(this.name)?.setValue(value);
  }
}
