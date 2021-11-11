import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
// eslint-disable-next-line camelcase
import { fr_FR, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject, takeUntil } from 'rxjs';

import { PageService } from '@cali/angular-common-utils';

@Component({
  selector: 'cali-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  page$ = this.pageService.getPage();

  constructor(
    private translate: TranslateService,
    private nzI18n: NzI18nService,
    private pageService: PageService,
    private readonly meta: MetaService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
    this.nzI18n.setLocale(fr_FR);

    this.page$.pipe(takeUntil(this.unsubscribe$)).subscribe((page) => {
      if (page.title) {
        this.meta.setTitle(this.translate.instant(page.title));
      }
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
