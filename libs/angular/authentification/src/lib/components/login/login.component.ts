import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthentificationForRootEnum,
  AuthentificationOptionsInterface,
} from '../../authentification-for-root.interface';
import { SessionService } from '../../services/session.service';

import { ErrorService } from '@tractr/angular-tools';

@Component({
  selector: 'tractr-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({});

  /** Constructor */
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject(AuthentificationForRootEnum.options)
    private options: AuthentificationOptionsInterface,
    private errorService: ErrorService,
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
