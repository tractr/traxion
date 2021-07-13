import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AUTH_OPTIONS,
  AuthenticationOptions,
  SESSION_SERVICE,
} from '../../authentication.config';
import { SessionService } from '../../interfaces';

import { ErrorService } from '@tractr/angular-tools';

@Component({
  selector: 'tractr-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({});

  /** Constructor */
  constructor(
    private errorService: ErrorService,
    private router: Router,
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptions,
    @Inject(SESSION_SERVICE)
    private sessionService: SessionService,
  ) {}

  /** Called when the user click on sign in */
  onSignIn() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (!email && !password) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.sessionService
      .login(email, password)
      .then(async (self) => {
        if (self) {
          const urlAfterLogin = this.sessionService.popUrlAfterLogin();

          await this.router.navigate(
            urlAfterLogin ? [urlAfterLogin] : this.options.login.redirect,
          );
        }
      })
      .catch((err) => this.handleSignInError(err));
  }

  private handleSignInError(err: Error) {
    this.errorService.handle(err);
  }
}
