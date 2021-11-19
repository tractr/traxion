import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetaModule } from '@ngx-meta/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularAlertsUtilsModule } from '@cali/angular-alerts-utils';
import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AngularCommonUtilsModule } from '@cali/angular-common-utils';
import { AngularRextModule } from '@cali/common-angular-rext-client';
import { CommonGraphqlClientModule } from '@cali/common-graphql-client';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
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
    CommonGraphqlClientModule,
    AngularRextModule.forRoot({
      api: {
        url: 'http://localhost:4200/api',
      },
    }),
    AngularCommonUtilsModule,
    AngularAlertsUtilsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
