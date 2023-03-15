export type GraphqlResolverImportPathConfig = {
  nestjsServices: string;
  graphqlDtos: string;
};

export type GraphqlResolverGeneratorConfig = {
  output: string;
  importPaths: GraphqlResolverImportPathConfig;
};
