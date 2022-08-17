/* eslint-disable @typescript-eslint/unbound-method */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export type LoginCredentials = {
  email: string;
  password: string;
};

@Component({
  selector: 'tractr-login-form-ui',
  templateUrl: './login-form-ui.component.html',
  styleUrls: ['./login-form-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent implements OnInit {
  /**
   * Login form instance
   */
  validateForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  /**
   * Login emitter
   */
  @Output()
  loginEvent = new EventEmitter<LoginCredentials>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Emit login data on submit
   */
  submitForm() {
    if (!this.validateForm.valid) {
      return;
    }
    this.loginEvent.emit(this.validateForm.getRawValue());
  }
}
