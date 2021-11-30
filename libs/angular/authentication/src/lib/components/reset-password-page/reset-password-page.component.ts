import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AUTHENTICATION_OPTIONS } from '../../constants';
import { AuthenticationOptions } from '../../dtos';

@Component({
  selector: 'tractr-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.less'],
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  params?: {
    id: string;
    code: string;
  };

  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationOptions,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      if (params.id && params.code) {
        this.params = {
          id: params.id,
          code: params.code,
        };
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  submitted(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate([
      ...this.options.routing.prefix,
      this.options.login.routing,
    ]);
  }
}
