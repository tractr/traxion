import { RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../generated/models';

export interface SessionService<U = User> {
  me$: Observable<U | null>;

  logged$: BehaviorSubject<boolean>;

  isLogged(): boolean;

  fetchUser$(): Observable<U>;

  refresh(): void;

  login(email: string, password: string): Promise<U | null>;

  logout(): Promise<void>;

  setPathAfterLogin(route: RouterStateSnapshot | null): void;

  popUrlAfterLogin(): string | undefined;
}

export interface SessionServiceClass<User> {
  new (): SessionService<User>;
}
