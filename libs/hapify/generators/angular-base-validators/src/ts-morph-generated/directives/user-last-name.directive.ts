import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserLastName]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserLastNameDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserLastNameDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserLastName(control);
    }
}
