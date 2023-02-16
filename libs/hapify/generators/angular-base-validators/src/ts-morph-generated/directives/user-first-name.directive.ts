import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserFirstName]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserFirstNameDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserFirstNameDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserFirstName(control);
    }
}
