/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observer, Subject, takeUntil } from 'rxjs';

import { BaseInputComponent } from './base-input.component';
import { nullValidator } from './base.validator';

@Component({
  template: '',
})
export abstract class BaseUiComponent
  extends BaseInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  abstract value$: Subject<any>;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public ngControl?: NgControl,
  ) {
    super();

    // eslint-disable-next-line no-param-reassign
    if (ngControl) ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    const parentControl = this.ngControl?.control;
    if (!parentControl) return;

    parentControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });

    parentControl.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.errors$.next(parentControl.errors);
        this.changeDetectorRef.markForCheck();
      });

    parentControl.setValidators([
      parentControl.validator || nullValidator,
      this.validate.bind(this),
    ]);
    parentControl.updateValueAndValidity();
  }

  override onChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value$.next(value);
  };

  writeValue(value: unknown): void {
    this.value$.next(value);
  }

  registerOnChange(fn: Observer<unknown>) {
    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(): ValidationErrors | null {
    return null;
  }
}
