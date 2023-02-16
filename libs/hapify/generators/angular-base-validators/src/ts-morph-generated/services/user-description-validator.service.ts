import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { AngularModelsValidatorsModule } from "AngularModelsValidatorsModule";
import { validateUserEmail } from "../validators";

@Injectable({
      providedIn: AngularModelsValidatorsModule,
    })
export class UserDescriptionService implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserDescription(control);
    }
}
