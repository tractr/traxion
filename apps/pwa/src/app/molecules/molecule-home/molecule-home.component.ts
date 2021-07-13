import { Component, Inject, OnInit } from '@angular/core';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';

@Component({
  selector: 'stack-tractr-molecule-home',
  templateUrl: './molecule-home.component.html',
  styleUrls: ['./molecule-home.component.less'],
})
export class MoleculeHomeComponent implements OnInit {
  isLogged = false;

  constructor(
    @Inject(SESSION_SERVICE)
    readonly sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.sessionService.logged$.subscribe((logged) => {
      this.isLogged = logged;
    });
  }
}
