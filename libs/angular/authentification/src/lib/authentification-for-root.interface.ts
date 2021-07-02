export interface AuthentificationEnvironmentInterface {
  api: {
    url: string;
  };
  routing: {
    prefix: string[];
  };
  login: {
    url: string;
    redirection: string[];
  };
  logout: {
    url: string;
    redirection: string[];
  };
  session: {
    url: string;
  };
}

export interface AuthentificationForRootInterface {
  environment: AuthentificationEnvironmentInterface;
}
