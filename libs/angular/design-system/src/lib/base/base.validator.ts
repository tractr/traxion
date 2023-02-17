/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */

import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const {
  email,
  max,
  maxLength,
  min,
  minLength,
  nullValidator,
  pattern,
  required,
  requiredTrue,
} = Validators;

export function inList(values: any[]) {
  return (control: AbstractControl<any, any>): ValidationErrors | null =>
    values.includes(control.value) ? null : { in: true };
}

export function compose(
  validators: (ValidatorFn | null | undefined)[],
): ValidatorFn {
  const composeFn = Validators.compose(validators);
  return composeFn === null ? nullValidator : composeFn;
}
