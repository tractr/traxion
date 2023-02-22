import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/commons";
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator } from "@angular/forms";
import { BaseControlValueAccessorComponent } from "@poc/trxn-angular-tools";
import { UserIdComponent, UserFirstNameComponent, UserLastNameComponent, UserEmailComponent, UserPasswordComponent, UserDescriptionComponent, UserEnabledComponent, UserCreditsComponent, UserRoleComponent } from "@poc/angular-models";

@Component({
        standalone: true,
        imports: [
        CommonModule,
        ReactiveFormsModule,
        UserIdComponent,UserFirstNameComponent,UserLastNameComponent,UserEmailComponent,UserPasswordComponent,UserDescriptionComponent,UserEnabledComponent,UserCreditsComponent,UserRoleComponent
      ],
        selector: 'poc-user-form-control',
        templateUrl: './user-form-control.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        })
export class UserFormControlComponent extends BaseControlValueAccessorComponent implements OnInit, ControlValueAccessor, Validator {
    control: FormGroup<UserFormControls> = new FormGroup({
              id: new FormControl('', { nonNullable: true }), 
        firstName: new FormControl('', { nonNullable: true }), 
        lastName: new FormControl('', { nonNullable: true }), 
        email: new FormControl('', { nonNullable: true }), 
        password: new FormControl('', { nonNullable: true }), 
        description: new FormControl('', { nonNullable: true }), 
        enabled: new FormControl('', { nonNullable: true }), 
        credits: new FormControl('', { nonNullable: true }), 
        role: new FormControl('', { nonNullable: true }), 

            });
}
