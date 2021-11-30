import { Component, Inject, OnInit } from '@angular/core';
import { User } from '@prisma/client';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';

@Component({
  selector: 'stack-molecule-connected',
  templateUrl: './molecule-connected.component.html',
  styleUrls: ['./molecule-connected.component.less'],
})
export class MoleculeConnectedComponent implements OnInit {
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
