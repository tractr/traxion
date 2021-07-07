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

export enum AuthentificationForRootEnum {
  'options',
}

export interface AuthentificationForRootInterface {
  [AuthentificationForRootEnum.options]: Partial<AuthentificationOptionsInterface>;
}
