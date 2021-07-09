import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  @Output() submitted = new EventEmitter<string>();

  @Output() cancel = new EventEmitter<void>();

  constructor(private passwordService: PasswordService) {}

  submit(): void {
    const email = this.getEmail();
    this.processing = true;

    this.passwordService
      .request(email)
      .then(() => {
        this.submitted.emit(email);
        this.processing = false;
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.form.get('email')?.setErrors({ notFound: true });
        }
        this.processing = false;
      });
  }

  getEmail(): string {
    const email = this.form.get('email')?.value;

    if (!email) console.error('Email not found in form');

    return email;
  }
}
