export type GraphqlResolverCaslImportPathConfig = {
  casl: string;
};

export type GraphqlResolverCaslGeneratorConfig = {
  output: string;
  importPaths: GraphqlResolverCaslImportPathConfig;
};
