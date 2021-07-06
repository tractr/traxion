export interface AuthentificationEnvironmentInterface {
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

export interface AuthentificationForRootInterface {
  environment: AuthentificationEnvironmentInterface;
}
