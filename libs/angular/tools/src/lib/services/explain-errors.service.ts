import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ExplainErrorsService {
  autoTips: Record<string, Record<string, string>> = {};

  constructor(
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) {
    this.defineAutoTips().catch((e: Error) =>
      this.notificationService.errors$.next({ error: e }),
    );
  }

  private async defineAutoTips() {
    const langs = this.translateService.getLangs();

    const translationsLangs = await Promise.all(
      langs.map((lang) =>
        lastValueFrom(this.translateService.getTranslation(lang)),
      ),
    );

    langs.forEach((lang, index) => {
      const translations = translationsLangs[index];
      this.autoTips[lang] = {
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
