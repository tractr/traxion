import { AbstractControl, ValidatorFn } from "@angular/forms";
import { compose } from "@poc/trxn-angular-tools";

export function validateUserCredits(control: AbstractControl): ValidatorFn {

      const validationResult = compose([])(control);  
            
      return validationResult === null
        ? null
        : { ...validationResult, userCredits: true };
}
