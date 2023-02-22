import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/commons";
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator } from "@angular/forms";
import { BaseControlValueAccessorComponent } from "@poc/trxn-angular-tools";
import { RoleIdComponent, RoleNameComponent, RoleDescriptionComponent } from "@poc/angular-models";

@Component({
        standalone: true,
        imports: [
        CommonModule,
        ReactiveFormsModule,
        RoleIdComponent,RoleNameComponent,RoleDescriptionComponent
      ],
        selector: 'poc-role-form-control',
        templateUrl: './role-form-control.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        })
export class RoleFormControlComponent extends BaseControlValueAccessorComponent implements OnInit, ControlValueAccessor, Validator {
    control: FormGroup<UserFormControls> = new FormGroup({
              id: new FormControl('', { nonNullable: true }), 
        name: new FormControl('', { nonNullable: true }), 
        description: new FormControl('', { nonNullable: true }), 

            });
}
