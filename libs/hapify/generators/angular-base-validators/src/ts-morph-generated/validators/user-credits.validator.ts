import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { credits, compose, required } from "@poc/trxn-angular-tools";

export function validateUserCredits(control: AbstractControl): ValidatorFn {
    const validationResult = compose([credits, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userCredits: true };
}

@Injectable()
export class UserCreditsValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserCredits(control);
    }
}
