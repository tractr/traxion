import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserDescription]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserDescriptionDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserDescriptionDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserDescription(control);
    }
}
