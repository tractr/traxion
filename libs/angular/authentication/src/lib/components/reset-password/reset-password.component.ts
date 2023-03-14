import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PasswordService } from '../../services';

@Component({
  selector: 'tractr-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less'],
})
export class ResetPasswordComponent {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  form = new UntypedFormGroup({}, { validators: this.checkPasswords });

  @Output() submitted = new EventEmitter<void>();

  @Input() id!: string;

  @Input() code!: string;

  processing = false;

  passwordVisible = false;

  constructor(
    private passwordService: PasswordService,
    private message: NzMessageService,
  ) {}

  onSubmit(): void {
    this.processing = true;

    const password = this.getPassword();

    this.passwordService
      .reset(this.id, this.code, password)
      .then(() => {
        this.submitted.emit();
        this.processing = false;
      })
      .catch((err) => {
        if (err.error.statusCode === 400) {
          this.form.get('password')?.setErrors({ badRequest: true });
        } else if (err.error.statusCode === 401) {
          this.form.get('password')?.setErrors({ unauthorized: true });
        } else {
          this.message.create('error', err.message as string);
        }
        this.processing = false;
      });
  }

  getPassword(): string {
    const password = this.form.get('password')?.value;

    if (password) console.error('Password not found in form');

    return password;
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
