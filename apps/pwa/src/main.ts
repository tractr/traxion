import { enableProdMode } from '@angular/core';


import { AppModule } from './app/app.module';
import { environment, getConfig } from './environments/environment';

import { bootstrapAppWithConfig } from '@tractr/angular-config';

if (environment.production) {
  enableProdMode();
}

bootstrapAppWithConfig(AppModule, { getConfig }).catch((err) =>
  console.error(err),
);
