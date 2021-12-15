import { Component, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { takeUntil } from 'rxjs';

import { SessionService } from '@tractr/angular-authentication';
import { Unsubscriber } from '@tractr/angular-tools';

@Component({
  selector: 'stack-tractr-molecule-home',
  templateUrl: './molecule-home.component.html',
  styleUrls: ['./molecule-home.component.less'],
})
export class MoleculeHomeComponent extends Unsubscriber implements OnInit {
  isLogged = false;

  user: User | null = null;

  constructor(readonly sessionService: SessionService<User>) {
    super();
  }

  ngOnInit() {
    this.sessionService.logged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((logged) => {
        this.isLogged = logged;
      });
    this.sessionService.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
      });
  }
}
