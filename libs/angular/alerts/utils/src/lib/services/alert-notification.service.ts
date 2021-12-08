import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { takeUntil, tap } from 'rxjs';

import { AlertPushNotificationService } from './alert-push-notification.service';

@Injectable()
export class AlertNotificationService {
  constructor(
    private alertPushNotificationService: AlertPushNotificationService,
    private nzNotificationService: NzNotificationService,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  /**
   * Trigger a visual and audion notification when an alert is created
   */
  notificationAlert$ = this.alertPushNotificationService
    .subscribeToAlertCreation()
    .pipe(
      tap((alertId) => {
        const notificationCreated = this.nzNotificationService.info(
          this.translateService.instant('notification-new-alert-title'),
          this.translateService.instant('notification-new-alert-content'),
          {
            nzDuration: 3000,
            nzPauseOnHover: true,
            nzClass: 'notification-alert',
          },
        );

        notificationCreated.onClick
          .pipe(takeUntil(notificationCreated.onClose))
          .subscribe(() => {
            this.router
              .navigate(['alertes', alertId.data?.alertCreated?.id])
              .then(() =>
                this.nzNotificationService.remove(
                  notificationCreated.messageId,
                ),
              )
              .catch((e) => console.error(e));
          });

        this.playAudioNotification();
      }),
    );

  playAudioNotification() {
    const song = new Audio('../assets/angular/alerts/utils/notification.mp3');
    song
      .play()
      .then()
      .catch((e) => {
        console.error(e);
      });
  }
}
