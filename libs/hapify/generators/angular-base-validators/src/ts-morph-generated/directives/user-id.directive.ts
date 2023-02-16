import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserId]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserIdDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserIdDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserId(control);
    }
}
