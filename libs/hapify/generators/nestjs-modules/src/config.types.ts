export type NestjsModulesImportPath = {
  nestjsAuthorizedServices: string;
  nestjsGraphqlResolvers: string;
  nestjsServices: string;
  caslAppConfig?: string;
  casl?: string;
};

export type NestjsModulesGeneratorConfig = {
  output: string;
  overwrite?: boolean;
  importPaths: NestjsModulesImportPath;
};
