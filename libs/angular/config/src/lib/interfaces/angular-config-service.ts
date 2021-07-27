import { BehaviorSubject, Observable } from 'rxjs';

export interface AngularConfigService<T = unknown> {
  refresh$: BehaviorSubject<T | undefined>;
  value$: BehaviorSubject<T | undefined>;
  getConfig$: Observable<T>;
  config$: Observable<T>;
  waitInitialisationConfig$: Observable<T>;
  config: T;
}
