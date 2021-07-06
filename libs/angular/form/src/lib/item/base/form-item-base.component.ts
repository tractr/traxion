import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgModel,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type ItemStatusInterface = 'error' | 'success' | 'validating';

@Component({
  selector: 'tractr-form-item-base',
  template: '',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class FormItemBaseComponent<Type extends any>
  implements OnInit, OnDestroy
{
  private unsubscribe: Subject<void> = new Subject<void>();

  @Input() form: FormGroup = new FormGroup({});

  @Input() name = 'base';

  @Input() subtype?: string;

  @Input() label?: string;

  @Input() state?: Type;

  @Input() required = true;

  @Input() errorTip:
    | string
    | TemplateRef<{ $implicit: FormControl | NgModel }>
    | undefined;

  status: ItemStatusInterface = 'validating';

  ngOnInit(): void {
    let control: AbstractControl | null = this.form.get(this.name);

    // Auto init control
    if (!control) {
      control = this.initControl();
      this.form.addControl(this.name, control);
    }

    if (control) {
      control?.statusChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.status = this.getStatus(control);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  abstract initControl(): AbstractControl;

  getValue(): Type | undefined {
    const value = this.form.get(this.name)?.value;

    return value ? (value as Type) : value;
  }

  setValue(value: Type | undefined): void {
    this.form.get(this.name)?.setValue(value);
  }

  getStatus(control: AbstractControl | null): ItemStatusInterface {
    if (!control) return 'validating';
    return control.errors ? 'error' : 'success';
  }
}
