import { kebab, pascal } from 'case';
import { Project } from 'ts-morph';

import { generateResolverDecorators } from './decorators.generator';
import { generateImports } from './imports.generator';
import { GraphqlResolverCaslImportPathConfig } from '../config.type';

import { Model } from '@trxn/hapify-core';

export function generateResolverAuthorization(
  project: Project,
  model: Model,
  path: string,
  importPaths: GraphqlResolverCaslImportPathConfig,
) {
  const modelPascal = pascal(model.name);
  const modelSnake = kebab(model.name);
  const fileName = `${modelSnake}.resolver.ts`;
  const filePath = `${path}/resolvers/${fileName}`;

  const sourceFile = project.getSourceFile(filePath);

  if (!sourceFile) throw new Error(`No source file found for ${filePath}`);

  const resolverClass = sourceFile?.getClass(`${modelPascal}Resolver`);

  if (!resolverClass)
    throw new Error(`No resolver class found for ${modelPascal}Resolver`);

  generateResolverDecorators(model, resolverClass);

  const imports = generateImports(model, importPaths);

  sourceFile.addImportDeclarations(imports);
}
