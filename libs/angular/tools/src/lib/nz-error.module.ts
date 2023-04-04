import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { InitNzNotificationService } from './services';

/**
 * Use this module if you want to use the nz notification service.
 *
 * @example
 *
 * ```ts
 * // app.module.ts
 * import { ErrorModule, NzErrorModule } from '@trxn/angular-tools';
 *
 * @NgModule({
 *  imports: [
 *   ErrorModule,
 *   NzErrorModule,
 *  ],
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [NzMessageModule],
  providers: [InitNzNotificationService],
})
export class NzErrorModule {}
