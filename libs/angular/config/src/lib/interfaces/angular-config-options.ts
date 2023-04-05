export type AngularConfigModuleOptions = {
  sessionStorageKey: string;
  configurationEndpoint: string;
  transformConfig?: (
    angularConfig: Record<string, unknown>,
  ) => Record<string, unknown>;
};

export type AngularConfigOptions = {
  sessionStorageKey?: string;
  configurationEndpoint?: string;
  transformConfig?: (
    angularConfig: Record<string, unknown>,
  ) => Record<string, unknown>;
};
