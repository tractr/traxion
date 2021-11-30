import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AUTHENTICATION_OPTIONS } from '../../constants';
import { AuthenticationOptions } from '../../dtos';

@Component({
  selector: 'tractr-lost-password-page',
  templateUrl: './lost-password-page.component.html',
  styleUrls: ['./lost-password-page.component.less'],
})
export class LostPasswordPageComponent {
  resetRequestSentTo?: string;

  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationOptions,
    private router: Router,
  ) {}

  cancel(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate([
      ...this.options.routing.prefix,
      this.options.login.routing,
    ]);
  }
}
