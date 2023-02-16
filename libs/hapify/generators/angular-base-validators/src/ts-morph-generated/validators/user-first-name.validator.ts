import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { firstName, compose, required } from "@poc/trxn-angular-tools";

export function validateUserFirstName(control: AbstractControl): ValidatorFn {
    const validationResult = compose([firstName, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userFirstName: true };
}

@Injectable()
export class UserFirstNameValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserFirstName(control);
    }
}
