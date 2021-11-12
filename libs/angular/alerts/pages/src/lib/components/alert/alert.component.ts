import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject } from 'rxjs';

import { PageInterface, PageService } from '@cali/angular-common-utils';

@Component({
  selector: 'cali-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnDestroy {
  idAlert$ = this.route.params.pipe(map((params) => <string>params.id));

  pageData: PageInterface = {
    title: 'page_title-alert-details',
  };

  protected unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    protected pageService: PageService,
  ) {}

  ngOnInit() {
    this.pageService.setPage(this.pageData);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
