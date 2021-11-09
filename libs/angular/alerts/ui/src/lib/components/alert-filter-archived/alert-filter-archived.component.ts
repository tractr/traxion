import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectOptionInterface } from '@tractr/angular-components';
import { DateTime } from 'luxon';
import { firstValueFrom } from 'rxjs';

import { AlertFeedbackType } from '@cali/common-models';

interface AlertFiltersArchived {
  status: string | null;
  period: DateTime | null;
}

@Component({
  selector: 'cali-alert-filter-archived',
  templateUrl: './alert-filter-archived.component.html',
  styleUrls: ['./alert-filter-archived.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertFilterArchivedComponent implements OnInit {
  @Output() filtersActive = new EventEmitter<AlertFiltersArchived>();

  filtersAlertsArchived: AlertFiltersArchived = {
    status: null,
    period: null,
  };

  statusOptions: SelectOptionInterface<AlertFeedbackType | null>[] = [];

  timesOptions: SelectOptionInterface<DateTime | null>[] = [];

  constructor(private translateService: TranslateService) {}

  async ngOnInit(): Promise<void> {
    this.statusOptions = [
      {
        id: 1,
        label: await firstValueFrom(
          this.translateService.get('filter-common-all'),
        ),
        value: null,
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
          this.translateService.get('status-alert-type-suspectBehaviour'),
        ),
        value: AlertFeedbackType.suspectBehaviour,
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
          this.translateService.get('filter-common-all'),
        ),
        value: null,
      },
      {
        id: 2,
        label: await firstValueFrom(
          this.translateService.get('filter-period-30-days'),
        ),
        value: DateTime.now().minus({ days: 30 }),
      },
      {
        id: 3,
        label: await firstValueFrom(
          this.translateService.get('filter-period-3-months'),
        ),
        value: DateTime.now().minus({ months: 3 }),
      },
      {
        id: 4,
        label: await firstValueFrom(
          this.translateService.get('filter-period-6-months'),
        ),
        value: DateTime.now().minus({ months: 6 }),
      },
      {
        id: 5,
        label: await firstValueFrom(
          this.translateService.get('filter-period-1-year'),
        ),
        value: DateTime.now().minus({ years: 1 }),
      },
    ];
  }

  filterChange(
    option:
      | SelectOptionInterface<unknown>
      | SelectOptionInterface<unknown>[]
      | undefined,
    filterName: 'status' | 'period',
  ): void {
    if (!option || Array.isArray(option)) return;

    if (filterName === 'status') {
      this.filtersAlertsArchived.status = (
        option as SelectOptionInterface<AlertFeedbackType>
      ).value;
    }
    if (filterName === 'period') {
      this.filtersAlertsArchived.period = (
        option as SelectOptionInterface<DateTime>
      ).value;
    }

    this.filtersActive.emit(this.filtersAlertsArchived);
  }
}
