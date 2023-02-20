import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { UserRoleValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { UserRoleUiComponent } from "@trxn/angular-ui";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-user-roles',
        templateUrl: './user-roles.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class UserRoleComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public userRoleValidator: UserRoleValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.userRoleValidator.validate;
    }
}
