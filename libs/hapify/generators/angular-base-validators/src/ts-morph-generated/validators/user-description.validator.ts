import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { description, compose, required } from "@poc/trxn-angular-tools";

export function validateUserDescription(control: AbstractControl): ValidatorFn {
    const validationResult = compose([description, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userDescription: true };
}

@Injectable()
export class UserDescriptionValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserDescription(control);
    }
}
