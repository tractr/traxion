import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserPassword]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserPasswordDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserPasswordDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserPassword(control);
    }
}
