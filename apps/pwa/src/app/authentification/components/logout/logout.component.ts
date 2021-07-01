import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationEnvironmentInterface } from '../../authentification-for-root.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'stack-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject('environment')
    private environment: AuthentificationEnvironmentInterface,
  ) {}

  ngOnInit() {
    this.sessionService
      .logout()
      .then(() => this.router.navigate(this.environment.logout.redirection))
      .catch((err) => {
        console.error('Logout error', err);
      });
  }
}
