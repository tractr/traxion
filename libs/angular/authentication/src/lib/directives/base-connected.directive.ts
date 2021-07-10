import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SessionService } from '../services/session.service';

@Directive({
  selector: '[tractrBaseConnected]',
})
export abstract class BaseConnectedDirective implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private sessionService: SessionService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLogged(await this.sessionService.loggedIn());

    this.sessionService.selfSubject
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((self) => {
        this.isLogged(!!self);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  abstract isLogged(logged: boolean): void;

  protected toggleShow(show = true): void {
    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
