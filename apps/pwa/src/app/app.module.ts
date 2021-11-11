import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetaModule } from '@ngx-meta/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AngularCommonUtilsModule } from '@cali/angular-common-utils';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MetaModule.forRoot(),
    AppRoutingModule,
    AngularCommonUiModule,
    AngularCommonUtilsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
