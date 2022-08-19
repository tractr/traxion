import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginCredentials } from './ui/login-form-ui/login-form-ui.component';

import { SessionService } from '@tractr/angular-authentication';
import { ErrorService } from '@tractr/angular-tools';

@Component({
  selector: 'tractr-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  constructor(
    private sessionService: SessionService,
    private errorService: ErrorService,
  ) {}

  /**
   * Log a user on login event
   * @param credentials Login credentials
   */
  async login({ email, password }: LoginCredentials) {
    try {
      await this.sessionService.login(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) this.errorService.handle(error);
      else throw error;
    }
  }
}
