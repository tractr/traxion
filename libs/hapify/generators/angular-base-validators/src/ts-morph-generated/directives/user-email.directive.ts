import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserEmail]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserEmailDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserEmailDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserEmail(control);
    }
}
