// eslint-disable-next-line max-classes-per-file
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class Unsubscribe implements OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

/**
 * @deprecated Use Unsubscribe instead
 */
@Injectable()
export abstract class Unsubscriber extends Unsubscribe {}
