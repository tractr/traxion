import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SessionService } from '../services';

import { Unsubscribe } from '@trxn/angular-tools';

@Directive({
  selector: '[tractrBaseConnected]',
  standalone: true,
  providers: [],
})
export abstract class BaseConnectedDirective
  extends Unsubscribe
  implements OnInit
{
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private sessionService: SessionService,
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.sessionService.logged$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((logged) => {
        this.isLogged(logged);
      });
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
