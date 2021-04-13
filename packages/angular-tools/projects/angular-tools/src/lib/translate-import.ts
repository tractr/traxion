/*
 * Load the translator module
 */
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// Languages
export function TranslateModuleLoad(): ModuleWithProviders<TranslateModule> {
  return TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  });
}
