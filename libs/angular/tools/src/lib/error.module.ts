import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { GlobalErrorHandler } from './services';
import { ServerErrorInterceptor } from './services/server-error.service';

/**
 * Use this module if you want to use the global error handler and server error interceptor.
 * It will pipe all the messages to the notification service.
 *
 * @example
 *
 * ```ts
 * // app.module.ts
 * import { ErrorModule, NzNotificationService } from '@trxn/angular-tools';
 *
 * @NgModule({
 *  imports: [
 *   ErrorModule,
 *  ],
 *  providers: [
 *    NzNotificationService, // Use this service to show the notifications in nzMessageService.
 *  ],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
})
export class ErrorModule {}
