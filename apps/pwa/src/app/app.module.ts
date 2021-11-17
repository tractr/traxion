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
    BrowserModule,
    BrowserAnimationsModule,
    CommonGraphqlClientModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: true,
      defaultLanguage: 'fr',
    }),
    MetaModule.forRoot(),
    AppRoutingModule,
    AngularCommonUiModule,
    AngularCommonUtilsModule,
    AngularRextModule.register({
      api: {
        url: 'http://localhost:4200/api',
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
