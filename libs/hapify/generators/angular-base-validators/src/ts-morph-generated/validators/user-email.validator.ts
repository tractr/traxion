import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { email, compose, required } from "@poc/trxn-angular-tools";

export function validateUserEmail(control: AbstractControl): ValidatorFn {
    const validationResult = compose([email, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userEmail: true };
}

@Injectable()
export class UserEmailValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserEmail(control);
    }
}
