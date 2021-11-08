import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, PLATFORM_ID } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

import * as translationFr from '../assets/i18n/fr.json';

const TRANSLATIONS = {
  fr: translationFr,
};
export class JSONModuleLoader implements TranslateLoader {
  getTranslation(lang: keyof typeof TRANSLATIONS) {
    return of(TRANSLATIONS[lang]);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JSONModuleLoaderFactory(http: HttpClient, platform: any) {
  if (isPlatformBrowser(platform)) {
    return new TranslateHttpLoader(http);
  }
  return new JSONModuleLoader();
}

export function TranslateModuleLoad(): ModuleWithProviders<TranslateModule> {
  return TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: JSONModuleLoaderFactory,
      deps: [HttpClient, PLATFORM_ID],
    },
  });
}
