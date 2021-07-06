import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationEnvironmentInterface } from '../../authentification-for-root.interface';
import { SessionService } from '../../services/session.service';

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
    @Inject('environment')
    private environment: AuthentificationEnvironmentInterface,
  ) {}

  /** Called when the user click on sign in */
  onSignIn() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.sessionService.login(this.email, this.password).then(async () => {
      const urlAfterLogin = this.sessionService.popUrlAfterLogin();

      await this.router.navigate(
        urlAfterLogin ? [urlAfterLogin] : this.environment.login.redirect,
      );
    });
  }

  handleSignInError(err: Error) {
    // eslint-disable-next-line no-console
    console.log('error sign in', err);
  }
}
