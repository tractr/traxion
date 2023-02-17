import { Component, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observer, takeUntil } from 'rxjs';

import { BaseInputComponent } from './base-input.component';
import { nullValidator } from './base.validator';

@Component({
  template: '',
})
export abstract class BaseControlValueAccessorComponent
  extends BaseInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  abstract control: AbstractControl;

  constructor(@Self() @Optional() public ngControl?: NgControl) {
    super();

    // eslint-disable-next-line no-param-reassign
    if (ngControl) ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    const parentControl = this.ngControl?.control;
    if (!parentControl) return;

    const validators = [
      parentControl.validator || nullValidator,
      this.validate.bind(this),
    ];

    parentControl.setValidators(validators);
    parentControl.updateValueAndValidity();

    this.control.addValidators(this.validator);
    this.control.updateValueAndValidity();

    this.control.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.errors$.next(this.getCurrentControlErrors());
      });
  }

  get validator(): (control: AbstractControl) => ValidationErrors | null {
    return nullValidator;
  }

  writeValue(obj: unknown): void {
    if (obj) this.control.setValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: Observer<unknown>): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.control.disable();
    else this.control.enable();
  }

  validate(): ValidationErrors | null {
    return this.getCurrentControlErrors();
  }

  getCurrentControlErrors(): ValidationErrors | null {
    const currentControl = this.control;

    if (currentControl instanceof FormGroup) {
      return this.control.valid
        ? null
        : {
            ...this.control.errors,
            ...Object.keys(currentControl.controls).reduce(
              (errors, controlName) => ({
                ...errors,
                ...(currentControl.controls[controlName].valid
                  ? null
                  : {
                      [controlName]:
                        currentControl.controls[controlName].errors,
                    }),
              }),
              {},
            ),
          };
    }
    if (currentControl instanceof FormControl) {
      return currentControl.valid ? null : currentControl.errors;
    }
    return null;
  }
}
