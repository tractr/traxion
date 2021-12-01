import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularAlertsPagesRoutingModule } from './angular-alerts-pages-routing.module';
import { AlertComponent, AlertsComponent } from './components';

import { AngularAlertsFeaturesModule } from '@cali/angular-alerts-features';
import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AngularFeedbacksFeaturesModule } from '@cali/angular-feedbacks-features';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: true,
      defaultLanguage: 'fr',
      extend: true,
      isolate: false,
    }),
    AngularCommonUiModule,
    AngularAlertsPagesRoutingModule,
    AngularAlertsFeaturesModule,
    AngularFeedbacksFeaturesModule,
  ],
  exports: [AngularAlertsPagesRoutingModule],
  declarations: [AlertsComponent, AlertComponent],
})
export class AngularAlertsPagesModule {}
