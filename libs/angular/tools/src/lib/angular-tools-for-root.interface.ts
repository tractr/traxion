export interface AngularToolsEnvironmentInterface {
  api: {
    uri: string;
  };
  appCode: string;
  appVersion: string;
}

export interface AngularToolsForRootInterface {
  environment: AngularToolsEnvironmentInterface;
}
