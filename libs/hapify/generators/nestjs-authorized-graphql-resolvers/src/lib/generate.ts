import { Project } from 'ts-morph';

import { GraphqlResolverCaslGeneratorConfig } from './config.type';
import { generatePoliciesIndexSourceFile } from './generators/policies/index.generator';
import { generatePolicy } from './generators/policies/policy.generator';
import { generateResolverAuthorization } from './generators/resolver-authorizations.generator';

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
    generatePolicy(project, model, output);
  });

  // policies
  generatePoliciesIndexSourceFile(project, models, output);
}
