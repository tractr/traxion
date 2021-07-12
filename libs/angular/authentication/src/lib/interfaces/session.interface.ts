import { Subject } from 'rxjs';

export interface SessionService<User> {
  userSubject: Subject<User | null>;

  userValue: User | null;

  user: User | null;

  current(): Promise<User | null>;
}

export interface SessionServiceClass<User> {
  new (): SessionService<User>;
}
