/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { kebab } from 'case';
import { Project } from 'ts-morph';

import { generateDtoSourceFile } from './generators/dto/dto.generator';
import { generateResolverSourceFile } from './generators/resolver/resolver.generator';

import { Schema } from '@trxn/hapify-core';

export type GraphqlResolverGeneratorConfig = {
  generatedDirectory: string;
};

export function generate(
  project: Project,
  dataModel: Schema,
  config: GraphqlResolverGeneratorConfig,
) {
  const { generatedDirectory } = config;

  // Generate resolvers and dtos
  dataModel.models.forEach((model) => {
    const entityPath = `${generatedDirectory}/${kebab(model.name)}`;
    generateResolverSourceFile(project, model, entityPath);
    generateDtoSourceFile(project, model, entityPath);
  });
}
