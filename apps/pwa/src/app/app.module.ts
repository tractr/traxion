import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetaModule } from '@ngx-meta/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ANGULAR_CONFIG_SERVICE,
  AngularConfigModule,
  AngularConfigService,
} from '@tractr/angular-config';

import { AppConfig } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularAlertsUtilsModule } from '@cali/angular-alerts-utils';
import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AngularCommonUtilsModule } from '@cali/angular-common-utils';
import { AngularGraphqlClientModule } from '@cali/angular-graphql-client';
import { AngularRextClientModule } from '@cali/angular-rext-client';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  imports: [
    /**
     * Angular modules
     */
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MetaModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: true,
      defaultLanguage: 'fr',
    }),
    /**
     * Routing module
     */
    AppRoutingModule,
    /**
     * UI modules
     */
    AngularCommonUiModule,
    /**
     * Utils modules
     */
    AngularConfigModule.forRoot(),
    AngularRextClientModule.forRootAsync({
      useFactory: (
        _,
        angularConfigService: AngularConfigService<AppConfig>,
      ) => ({
        api: {
          url: angularConfigService.config?.api.uri ?? '',
        },
      }),
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
    AngularGraphqlClientModule.forRootAsync({
      useFactory: (_, angularConfigService: AngularConfigService<AppConfig>) =>
        angularConfigService.config?.graphql,
      deps: [ANGULAR_CONFIG_SERVICE],
    }),
    AngularCommonUtilsModule,
    AngularAlertsUtilsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
