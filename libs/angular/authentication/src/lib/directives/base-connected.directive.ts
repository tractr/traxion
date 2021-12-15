import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SessionService } from '../services';

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
    this.sessionService.me$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.isLogged(!!user);
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
