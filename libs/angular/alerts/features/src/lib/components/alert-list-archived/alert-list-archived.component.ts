import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertService } from '@cali/common-angular-rext-client';
import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list-archived',
  templateUrl: './alert-list-archived.component.html',
  styleUrls: ['./alert-list-archived.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListArchivedComponent implements OnInit {
  alertsArchived$!: Observable<Alert[]>;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertsArchived$ = this.loadAlertsArchived();
  }

  loadAlertsArchived() {
    return this.alertService.findMany$();
  }
}
