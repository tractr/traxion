import { Component, Inject, OnInit } from '@angular/core';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';
import { APP_CONFIG_SERVICE, AppConfigService } from '@tractr/angular-config';

@Component({
  selector: 'stack-tractr-molecule-home',
  templateUrl: './molecule-home.component.html',
  styleUrls: ['./molecule-home.component.less'],
})
export class MoleculeHomeComponent implements OnInit {
  isLogged = false;

  constructor(
    @Inject(APP_CONFIG_SERVICE)
    readonly configService: AppConfigService,
    @Inject(SESSION_SERVICE)
    readonly sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.sessionService.logged$.subscribe((logged) => {
      this.isLogged = logged;
    });
  }
}
