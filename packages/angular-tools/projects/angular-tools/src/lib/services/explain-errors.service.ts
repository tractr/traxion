import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ExplainErrorsService {
  get autoTips(): Record<string, Record<string, string>> {
    return this.autoTipsValue;
  }

  private autoTipsValue: Record<string, Record<string, string>> = {};

  constructor(
    private translateService: TranslateService,
    private errorService: ErrorService,
  ) {
    this.defineAutoTips().catch((e) => this.errorService.handle(e));
  }

  private async defineAutoTips() {
    const langs = this.translateService.getLangs();

    const translationsLangs = await Promise.all(
      langs.map((lang) =>
        this.translateService.getTranslation(lang).toPromise(),
      ),
    );

    langs.forEach((lang, index) => {
      const translations = translationsLangs[index];
      this.autoTipsValue[lang] = {
        min: translations['common_error-min'],
        max: translations['common_error-max'],
        required: translations['common_error-required'],
        requiredtrue: translations['common_error-required_true'],
        email: translations['common_error-email'],
        minlength: translations['common_error-min_length'],
        maxlength: translations['common_error-max_length'],
        pattern: translations['common_error-pattern'],
        passwordWrong: translations['common_error-password_wrong'],
      };
    });
  }
}
