import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthentificationForRootEnum,
  AuthentificationOptionsInterface,
} from '../../authentification-for-root.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'tractr-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject(AuthentificationForRootEnum.options)
    private options: AuthentificationOptionsInterface,
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
