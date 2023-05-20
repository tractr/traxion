export type NestjsModulesImportPath = {
  nestjsAuthorizedServices: string;
  nestjsGraphqlResolvers: string;
  nestjsServices: string;
};

export type NestjsModulesGeneratorConfig = {
  output: string;
  overwrite?: boolean;
  importPaths: NestjsModulesImportPath;
};
