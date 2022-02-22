import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

import { LoginCredentials } from './ui/login-form-ui/login-form-ui.component';

import { SessionService } from '@tractr/angular-authentication';
import { ErrorService } from '@tractr/angular-tools';

@Component({
  selector: 'stack-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  constructor(
    private sessionService: SessionService,
    private errorService: ErrorService,
  ) {}

  public isUserLogged = false;

  public currentUser$!: Observable<User>;

  /**
   * Log a user on login event
   * @param credentials Login credentials
   */
  async login({ email, password }: LoginCredentials) {
    try {
      const isLogged = await this.sessionService.login(email, password);

      // console.log(this.sessionService.isLogged());

      if (isLogged) {
        this.isUserLogged = true;
        console.info('isLogged', this.isUserLogged);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.errorService.handle(error);
    }
  }
}
