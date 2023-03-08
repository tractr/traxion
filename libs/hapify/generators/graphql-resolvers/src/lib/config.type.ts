export type GraphqlResolverImportPathConfig = {
  nestjsServices: string;
  graphqlDtos: string;
};

export type GraphqlResolverGeneratorConfig = {
  generatedDirectory: string;
  importPaths: GraphqlResolverImportPathConfig;
};
