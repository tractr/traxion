import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { RoleNameValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { RoleNameUiComponent } from "@trxn/angular-ui";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-role-names',
        templateUrl: './role-names.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class RoleNameComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public roleNameValidator: RoleNameValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.roleNameValidator.validate;
    }
}
