import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertFiltersArchived } from '@cali/angular-alerts-ui';
import { AlertWithCurrentFeedbackService } from '@cali/angular-rext-client';
import { AlertWithCurrentFeedback } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list-archived',
  templateUrl: './alert-list-archived.component.html',
  styleUrls: ['./alert-list-archived.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListArchivedComponent {
  alertsArchived$!: Observable<AlertWithCurrentFeedback[]>;

  constructor(
    private alertWithCurrentFeedbackService: AlertWithCurrentFeedbackService,
  ) {}

  loadAlertsArchived(filters: AlertFiltersArchived) {
    this.alertsArchived$ = this.alertWithCurrentFeedbackService.findMany$({
      isArchived: true,
      skip: 0,
      take: 100,
      sort: 'id',
      order: 'asc',
      ...filters,
    });
  }
}
