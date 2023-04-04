import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginCredentials } from './ui/login-form-ui/login-form-ui.component';

import { SessionService } from '@trxn/angular-authentication';
import { NotificationService } from '@trxn/angular-tools';

@Component({
  selector: 'tractr-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  constructor(
    private sessionService: SessionService,
    private notifier: NotificationService,
  ) {}

  /**
   * Log a user on login event
   * @param credentials Login credentials
   */
  async login({ email, password }: LoginCredentials) {
    try {
      await this.sessionService.login(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) this.notifier.errors$.next({ error });
      else throw error;
    }
  }
}
