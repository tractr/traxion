import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserEnabled]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserEnabledDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserEnabledDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserEnabled(control);
    }
}
