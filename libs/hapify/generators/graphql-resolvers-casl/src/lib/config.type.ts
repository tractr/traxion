export type GraphqlResolverCaslImportPathConfig = {
  nestjsAuthorizedServices: string;
  casl: string;
};

export type GraphqlResolverCaslGeneratorConfig = {
  output: string;
  importPaths: GraphqlResolverCaslImportPathConfig;
};
