import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TranslateModuleLoad } from './translate-import';

// import { PwaCommonUiModule } from '@cali/angular-common-ui';

registerLocaleData(localeFr);

@NgModule({
  declarations: [],
  imports: [HttpClientModule, TranslateModuleLoad()],
  exports: [TranslateModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class StorybookTranslateMockModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}

export const DefaultStorybookModules = [
  // PwaCommonUiModule,
  StorybookTranslateMockModule,
];
