import { Project } from 'ts-morph';

import { GraphqlResolverGeneratorConfig } from './config.type';
import { generateDtoSourceFile } from './generators/dto/dto.generator';
import {
  generateDtoIndexSourceFile,
  generateResolverIndexSourceFile,
  generateRootIndexSourceFile,
} from './generators/index.generator';
import { generateModuleSourceFile } from './generators/module/module.generator';
import { generateModuleDefinitionSourceFile } from './generators/module-definition/module.generator';
import { generateResolverSourceFile } from './generators/resolver/resolver.generator';

import { Schema } from '@trxn/hapify-core';

export function generate(
  project: Project,
  dataModel: Schema,
  config: GraphqlResolverGeneratorConfig,
) {
  const { output, importPaths } = config;

  // Generate resolvers and dtos
  dataModel.models.forEach((model) => {
    generateResolverSourceFile(project, model, output, importPaths);
    generateDtoSourceFile(project, model, output, importPaths);
  });

  // Generate module
  generateModuleSourceFile(project, dataModel.models, output);
  generateModuleDefinitionSourceFile(project, output);

  // Generate index files
  generateResolverIndexSourceFile(project, dataModel.models, output);
  generateDtoIndexSourceFile(project, dataModel.models, output);
  generateRootIndexSourceFile(project, dataModel.models, output);
}
