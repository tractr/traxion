import { Component, Inject } from '@angular/core';
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
  /** Email input */
  email!: string;

  /** Password input */
  password!: string;

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.sessionService
      .login(this.email, this.password)
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
    console.error('error sign in', err);
    this.errorService.handle(err);
  }
}
