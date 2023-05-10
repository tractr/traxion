export type NestjsAuthorizedServicesImportPathConfig = {
  nestjsServices: string;
};

export type NestjsAuthorizedServicesGeneratorConfig = {
  output: string;
  importPaths: NestjsAuthorizedServicesImportPathConfig;
  overwrite?: boolean;
};
