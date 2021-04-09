import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Unsubscriber } from '../utils/unsubscriber';
import { takeUntil, tap } from 'rxjs/operators';
/**
 * Uncomment only if you use component with translatable texts (ex: nzCalendar)
 * Check others modules and shared/i18n.service for other code lines to uncomment in order to make everything work.
 * -------------
 * import { NzI18nService } from 'ng-zorro-antd/i18n';
 * import {
 *   translateNgZorroDateFactory,
 *   translateNgZorroFactory,
 * } from '../loaders/translate-ngzorro';
 * -------------
 */

export type I18nItems = { [key in string]: string };
export interface I18nItem {
  key: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class I18nService extends Unsubscriber {
  readonly languages: I18nItems = {
    en: 'English',
    fr: 'Français',
  }; // Todo: Renseigner cette variables à travers le forRoot()
  readonly language$ = new BehaviorSubject<I18nItem>(
    this.getLanguageAtLanding()
  );

  /**
   * Add nzI18nService in constructor only if you use component with translatable texts (ex: nzCalendar)
   * Check others modules and shared/i18n.service for other code lines to uncomment in order to make everything work.
   * -------------
   * private nzI18nService: NzI18nService
   * -------------
   */
  constructor(
    private translateService: TranslateService,
    private localizeService: LocalizeRouterService
  ) {
    super();
    this.language$
      .pipe(
        tap((language) => this.activateLanguage(language)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private getLanguageAtLanding(): I18nItem {
    const localizeLanguageCodeAtLanding = this.localizeService.parser
      .currentLang;
    const firstLanguageAvailableFound: I18nItem = {
      key: Object.keys(this.languages)[0],
      label: Object.values(this.languages)[0],
    };
    return this.languages[localizeLanguageCodeAtLanding]
      ? {
          key: localizeLanguageCodeAtLanding,
          label: this.languages[localizeLanguageCodeAtLanding],
        }
      : firstLanguageAvailableFound;
  }

  private activateLanguage(language: I18nItem): void {
    if (this.localizeService.parser.currentLang === language.key) return;
    this.localizeService.changeLanguage(language.key);
    /**
     * Uncomment only if you use component with translatable texts (ex: nzCalendar)
     * Check others modules and shared/i18n.service for other code lines to uncomment in order to make everything work.
     * -------------
     * this.setNzLocales(language);
     * -------------
     */
  }

  /**
   * Uncomment only if you use component with translatable texts (ex: nzCalendar)
   * Check others modules and shared/i18n.service for other code lines to uncomment in order to make everything work.
   * -------------
   * private setNzLocales(language: I18nItem): void {
   *   this.nzI18nService.setLocale(
   *     translateNgZorroFactory(language.key)
   *   );
   *   this.nzI18nService.setDateLocale(
   *     translateNgZorroDateFactory(language.key)
   *   );
   * }
   * -------------
   */
}
