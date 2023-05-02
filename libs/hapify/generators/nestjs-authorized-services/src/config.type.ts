export type NestjsAuthorizedServicesImportPathConfig = {
  nestjsServices: string;
  casl: string;
};

export type NestjsAuthorizedServicesGeneratorConfig = {
  output: string;
  importPaths: NestjsAuthorizedServicesImportPathConfig;
  overwrite?: boolean;
};
