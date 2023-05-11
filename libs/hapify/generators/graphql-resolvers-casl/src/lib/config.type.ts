export type GraphqlResolverCaslImportPathConfig = {
  nestjsAuthorizedServices: string;
};

export type GraphqlResolverCaslGeneratorConfig = {
  output: string;
  importPaths: GraphqlResolverCaslImportPathConfig;
};
