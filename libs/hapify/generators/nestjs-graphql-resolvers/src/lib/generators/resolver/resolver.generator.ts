import { kebab, pascal } from 'case';
import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateConstructor } from './constructor.generator';
import { generateCreateMethod } from './create-method.generator';
import { generateDeleteMethod } from './delete-method.generator';
import { generateFieldResolvers } from './field-resolver.generator';
import { generateFindManyMethod } from './find-many-method.generator';
import { generateFindUniqueMethod } from './find-unique-method.generator';
import { generateImports } from './imports.generator';
import { generateUpdateMethod } from './update-method.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model } from '@trxn/hapify-core';

export function generateResolverClass(model: Model): ClassDeclarationStructure {
  const modelPascal = pascal(model.name);

  const className = `${modelPascal}Resolver`;
  const constructor = generateConstructor(model);

  const methods = [
    generateFindUniqueMethod(model),
    generateFindManyMethod(model),
    generateCreateMethod(model),
    generateUpdateMethod(model),
    generateDeleteMethod(model),
    ...generateFieldResolvers(model),
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'Resolver', arguments: [`() => ${modelPascal}`] }],
    methods,
    ctors: [constructor],
  };
}

export function generateResolverSourceFile(
  project: Project,
  model: Model,
  path: string,
  importPaths: GraphqlResolverImportPathConfig,
) {
  const modelSnake = kebab(model.name);
  const fileName = `${modelSnake}.resolver.ts`;
  const filePath = `${path}/resolvers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const resolverClass = generateResolverClass(model);
  const imports = generateImports(model, importPaths);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(resolverClass);
}
