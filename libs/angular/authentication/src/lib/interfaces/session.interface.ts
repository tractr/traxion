import { RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SessionService<
  U extends Record<string, unknown> = Record<string, unknown>,
> {
  me$: Observable<U | null>;

  logged$: BehaviorSubject<boolean>;

  isLogged(): boolean;

  fetchUser$(): Observable<U | null>;

  refresh(): void;

  login(email: string, password: string): Promise<U | null>;

  logout(): Promise<void>;

  setPathAfterLogin(route: RouterStateSnapshot | null): void;

  popUrlAfterLogin(): string | undefined;
}

export interface SessionServiceClass<
  U extends Record<string, unknown> = Record<string, unknown>,
> {
  new (): SessionService<U>;
}
