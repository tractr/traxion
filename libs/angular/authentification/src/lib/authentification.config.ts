import { InjectionToken } from '@angular/core';

export interface AuthentificationOptionsInterface {
  api: {
    url: string;
  };
  routing: {
    prefix: string[];
  };
  login: {
    url: string;
    routing: string;
    redirect: string[];
  };
  logout: {
    url: string;
    redirect: string[];
  };
  session: {
    url: string;
  };
}

export const AUTH_OPTIONS =
  new InjectionToken<AuthentificationOptionsInterface>('auth.options');

export interface AuthentificationForRootInterface {
  options: Partial<AuthentificationOptionsInterface>;
}
