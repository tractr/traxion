import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTHENTICATION_OPTIONS } from '../../constants';
import { AuthenticationOptions } from '../../dtos';
import { SessionService } from '../../services';

@Component({
  selector: 'tractr-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationOptions,
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
