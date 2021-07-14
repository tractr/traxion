import { BehaviorSubject, Observable } from 'rxjs';

import { AppConfig } from './app-config';

export interface AppConfigService<T extends AppConfig = AppConfig> {
  refresh$: BehaviorSubject<T | void>;
  getConfig$: Observable<T>;
  config$: Observable<T>;
  waitInitialisationConfig$: Observable<T>;
}
