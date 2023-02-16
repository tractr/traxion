import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { enabled, compose, required } from "@poc/trxn-angular-tools";

export function validateUserEnabled(control: AbstractControl): ValidatorFn {
    const validationResult = compose([enabled, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userEnabled: true };
}

@Injectable()
export class UserEnabledValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserEnabled(control);
    }
}
