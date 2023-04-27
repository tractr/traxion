import { Project } from 'ts-morph';

import { GraphqlResolverCaslGeneratorConfig } from './config.type';
import { generateResolverAuthorization } from './generators/authorization';

import { Schema } from '@trxn/hapify-core';

export function generate(
  project: Project,
  schema: Schema,
  config: GraphqlResolverCaslGeneratorConfig,
) {
  const { output, importPaths } = config;

  const { models } = schema;

  models.forEach((model) => {
    generateResolverAuthorization(project, model, output, importPaths);
  });
}
