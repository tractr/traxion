import { HttpErrorResponse } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs';

import { NotificationService } from './notification.service';
import { Unsubscribe } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class NzNotificationService extends Unsubscribe {
  /**
   * Constructor
   */
  constructor(
    private message: NzMessageService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  onInit() {
    this.notificationService.errors$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((error) => {
        this.handle(error.error);
      });

    this.notificationService.messages$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ level, message }) => {
        this.message.create(level || 'info', message);
      });
  }

  /**
   * Handle an error
   */
  handle(error: string | Error | Error[]): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttp(error);
    } else {
      this.message.create(
        'error',
        (Array.isArray(error) ? error : [error])
          .map((err) => (typeof err === 'string' ? err : err.message))
          .join('\n'),
      );
    }
  }

  /**
   * Handle an http error
   */
  private handleHttp(error: HttpErrorResponse): void {
    // Create message
    const message =
      error.error && error.error.error && error.error.message
        ? `${error.error.error as string}: ${error.error.message as string}`
        : error.message;

    this.message.create('error', message);
  }
}

export const InitNzNotificationService: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (nzNotifier: NzNotificationService) => () => nzNotifier.onInit(),
  deps: [NzNotificationService],
  multi: true,
};
