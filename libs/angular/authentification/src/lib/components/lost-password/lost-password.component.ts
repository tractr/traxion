import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AUTH_OPTIONS,
  AuthentificationOptionsInterface,
} from '../../authentification.config';
import { PasswordService } from '../../services';

@Component({
  selector: 'tractr-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.less'],
})
export class LostPasswordComponent {
  /** The form group to use */
  form = new FormGroup({});

  processing = false;

  resetRequestSentTo: string | undefined;

  @Output() submitted = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();

  constructor(
    @Inject(AUTH_OPTIONS)
    private options: AuthentificationOptionsInterface,
    public router: Router,
    private passwordService: PasswordService,
  ) {}

  submit(): void {
    this.resetRequestSentTo = undefined;

    const email = this.getEmail();

    this.passwordService
      .request(email)
      .then(() => {
        this.resetRequestSentTo = email;
        this.submitted.emit();
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.form.get('email')?.setErrors({ notFound: true });
        }
      });
  }

  getEmail(): string {
    const email = this.form.get('email')?.value;

    if (!email) console.error('Email not found in form');

    return email;
  }

  onCancel(): void {
    this.cancel.emit();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate([
      ...this.options.routing.prefix,
      this.options.login.routing,
    ]);
  }
}
