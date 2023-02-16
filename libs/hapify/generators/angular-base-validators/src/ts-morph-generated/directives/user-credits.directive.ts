import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserCredits]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserCreditsDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserCreditsDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserCredits(control);
    }
}
