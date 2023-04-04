/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Unsubscribe } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends Unsubscribe {
  messages$ = new Subject<{
    level?: 'success' | 'info' | 'warning';
    message: string;
  }>();

  errors$ = new Subject<{ error: string | Error; stack?: string | null }>();

  constructor() {
    super();

    this.onInit();
  }

  onInit() {
    this.messages$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ level, message }) => {
        // We'll always log the message to the console.
        console.info(`[${level || 'info'}] : ${message}`);
      });

    this.errors$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ error, stack }) => {
        // We'll always log the error to the console.
        console.error(typeof error === 'string' ? `[error]: ${error}` : error);

        if (stack) console.error(`[stack]: ${stack}`);
      });
  }
}
