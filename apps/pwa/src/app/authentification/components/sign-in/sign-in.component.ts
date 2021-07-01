import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationEnvironmentInterface } from '../../authentification-for-root.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'stack-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
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
    this.sessionService
      .login(this.email, this.password)
      .then(async () => {
        const urlAfterLogin = this.sessionService.popUrlAfterLogin();

        await this.router.navigate(
          urlAfterLogin ? [urlAfterLogin] : this.environment.login.redirection,
        );
      })
      .catch((error) => this.handleSignInError(error));
  }

  handleSignInError(err: Error) {
    // eslint-disable-next-line no-console
    console.log('error sign in', err);
  }
}
