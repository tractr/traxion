import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

import { PageInterface, PageService } from '@cali/angular-common-utils';

@Component({
  selector: 'cali-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent implements OnInit, OnDestroy {
  pageData: PageInterface = {
    title: 'page_title-alerts-archived',
  };

  protected unsubscribe$: Subject<void> = new Subject<void>();

  constructor(protected pageService: PageService) {}

  ngOnInit() {
    this.pageService.setPage(this.pageData);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
