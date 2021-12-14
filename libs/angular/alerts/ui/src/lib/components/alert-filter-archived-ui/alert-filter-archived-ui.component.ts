import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectOptionInterface } from '@tractr/angular-components';
import { DateTime } from 'luxon';
import { firstValueFrom } from 'rxjs';

import { AlertFeedbackType } from '@cali/common-models';
import { AlertWithCurrentFeedbackFindManyQueryDto } from '@cali/common-rest-dtos';

export type AlertFiltersArchived = Pick<
  AlertWithCurrentFeedbackFindManyQueryDto,
  'createdAtMin' | 'alertFeedbackType'
>;

@Component({
  selector: 'cali-alert-filter-archived-ui',
  templateUrl: './alert-filter-archived-ui.component.html',
  styleUrls: ['./alert-filter-archived-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertFilterArchivedUiComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<AlertFiltersArchived>();

  filtersAlertsArchived = new FormGroup({});

  statusOptions: SelectOptionInterface<AlertFeedbackType | undefined>[] = [];

  timesOptions: SelectOptionInterface<Date | undefined>[] = [];

  filtersActive!: AlertFiltersArchived;

  constructor(private translateService: TranslateService) {}

  async ngOnInit(): Promise<void> {
    this.statusOptions = [
      {
        id: 1,
        label: await firstValueFrom(
          this.translateService.get('filter-common-all'),
        ),
        value: undefined,
      },
      {
        id: 2,
        label: await firstValueFrom(
          this.translateService.get('status-alert-type-thief'),
        ),
        value: AlertFeedbackType.thief,
      },
      {
        id: 3,
        label: await firstValueFrom(
          this.translateService.get('status-alert-type-suspectBehavior'),
        ),
        value: AlertFeedbackType.suspectBehavior,
      },
      {
        id: 4,
        label: await firstValueFrom(
          this.translateService.get('status-alert-type-falseAlert'),
        ),
        value: AlertFeedbackType.falseAlert,
      },
    ];

    this.timesOptions = [
      {
        id: 1,
        label: await firstValueFrom(
          this.translateService.get('filter-period-30-days'),
        ),
        value: DateTime.now().minus({ days: 30 }).toJSDate(),
      },
      {
        id: 2,
        label: await firstValueFrom(
          this.translateService.get('filter-period-3-months'),
        ),
        value: DateTime.now().minus({ months: 3 }).toJSDate(),
      },
      {
        id: 3,
        label: await firstValueFrom(
          this.translateService.get('filter-period-6-months'),
        ),
        value: DateTime.now().minus({ months: 6 }).toJSDate(),
      },
      {
        id: 4,
        label: await firstValueFrom(
          this.translateService.get('filter-period-1-year'),
        ),
        value: DateTime.now().minus({ years: 1 }).toJSDate(),
      },
      {
        id: 5,
        label: await firstValueFrom(
          this.translateService.get('filter-common-all'),
        ),
        value: undefined,
      },
    ];

    this.filtersActive = {
      alertFeedbackType: this.statusOptions[0].value,
      createdAtMin: this.timesOptions[0].value,
    };
  }

  filterChange(): void {
    const { value: alertFeedbackType } = (this.filtersAlertsArchived.get(
      'filterStatus',
    ) || {}) as Record<string, SelectOptionInterface<AlertFeedbackType>>;
    this.filtersActive.alertFeedbackType =
      alertFeedbackType && alertFeedbackType.value;

    const { value: createdAtMin } = (this.filtersAlertsArchived.get(
      'filterTime',
    ) || {}) as Record<string, SelectOptionInterface<Date>>;
    this.filtersActive.createdAtMin = createdAtMin && createdAtMin.value;

    this.filtersChanged.emit(this.filtersActive);
  }
}
