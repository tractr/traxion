import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageInterface, PageService } from '@cali/angular-common-utils';

@Component({
  selector: 'cali-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent implements OnInit, OnDestroy {
  pageData: PageInterface = {
    title: '',
  };

  protected unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    protected pageService: PageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.url
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((urls: UrlSegment[]) => {
        if (urls[urls.length - 1].path === 'archives') {
          this.pageData.title = 'page_title-alerts-archived';
        } else {
          this.pageData.title = 'page_title-alerts-in-progess';
        }
        this.pageService.setPage(this.pageData);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
