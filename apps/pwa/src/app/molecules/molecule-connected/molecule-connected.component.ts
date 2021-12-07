import { Component, OnInit } from '@angular/core';
import { User } from '@prisma/client';

import { SessionService } from '@tractr/angular-authentication';

@Component({
  selector: 'stack-molecule-connected',
  templateUrl: './molecule-connected.component.html',
  styleUrls: ['./molecule-connected.component.less'],
})
export class MoleculeConnectedComponent implements OnInit {
  user: User | null = null;

  constructor(protected readonly sessionService: SessionService<User>) {}

  ngOnInit() {
    this.sessionService.me$.subscribe((user) => {
      this.user = user;
    });
  }
}
