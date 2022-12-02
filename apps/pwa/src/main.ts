import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment, getConfig } from './environments/environment';

import {
  ANGULAR_CONFIGURATION_SESSION_STORAGE,
  bootstrapAppWithConfig,
} from '@trxn/angular-config';

if (environment.production) {
  enableProdMode();
}

bootstrapAppWithConfig(AppModule, {
  getConfig,
  sessionStorageKey: ANGULAR_CONFIGURATION_SESSION_STORAGE,
}).catch((err) => console.error(err));
