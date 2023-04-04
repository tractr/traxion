import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorInterceptor implements HttpInterceptor {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const notificationService = this.injector.get(NotificationService);

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        notificationService.errors$.next(error);

        return throwError(() => error);
      }),
    );
  }
}
