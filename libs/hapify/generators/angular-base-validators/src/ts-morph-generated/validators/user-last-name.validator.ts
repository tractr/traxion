import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { lastName, compose, required } from "@poc/trxn-angular-tools";

export function validateUserLastName(control: AbstractControl): ValidatorFn {
    const validationResult = compose([lastName, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userLastName: true };
}

@Injectable()
export class UserLastNameValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserLastName(control);
    }
}
