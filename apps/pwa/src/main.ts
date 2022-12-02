import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment, getConfig } from './environments/environment';

import { bootstrapAppWithConfig } from '@trxn/angular-config';

if (environment.production) {
  enableProdMode();
}

const ANGULAR_CONFIGURATION_SESSION_STORAGE = 'ANGULAR_CONFIGURATION';

bootstrapAppWithConfig(AppModule, {
  getConfig,
  sessionStorageKey: ANGULAR_CONFIGURATION_SESSION_STORAGE,
}).catch((err) => console.error(err));
