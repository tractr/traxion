import { Component, Inject, OnInit } from '@angular/core';
import { User } from '@prisma/client';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';

@Component({
  selector: 'stack-molecule-not-connected',
  templateUrl: './molecule-not-connected.component.html',
  styleUrls: ['./molecule-not-connected.component.less'],
})
export class MoleculeNotConnectedComponent implements OnInit {
  user: User | null = null;

  constructor(
    @Inject(SESSION_SERVICE)
    protected readonly sessionService: SessionService<User>,
  ) {}

  ngOnInit() {
    this.sessionService.me$.subscribe((user) => {
      this.user = user;
    });
  }
}
