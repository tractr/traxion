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
  const { generatedDirectory, importPaths } = config;

  // Generate resolvers and dtos
  dataModel.models.forEach((model) => {
    generateResolverSourceFile(project, model, generatedDirectory, importPaths);
    generateDtoSourceFile(project, model, generatedDirectory, importPaths);
  });

  // Generate module
  generateModuleSourceFile(project, dataModel.models, generatedDirectory);
  generateModuleDefinitionSourceFile(project, generatedDirectory);

  // Generate index files
  generateResolverIndexSourceFile(
    project,
    dataModel.models,
    generatedDirectory,
  );
  generateDtoIndexSourceFile(project, dataModel.models, generatedDirectory);
  generateRootIndexSourceFile(project, dataModel.models, generatedDirectory);
}
