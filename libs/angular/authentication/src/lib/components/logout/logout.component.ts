import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../../authentication.config';
import { InjectSessionService } from '../../decorators';
import { SessionService } from '../../interfaces';

@Component({
  selector: 'tractr-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptionsInterface,
    @InjectSessionService()
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.sessionService
      .logout()
      .then(() => this.router.navigate(this.options.logout.redirect))
      .catch((err) => {
        console.error('Logout error', err);
      });
  }
}
