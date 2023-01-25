import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateConstructor } from './constructor.generator';
import { generateCreateMethod } from './create-method.generator';
import { generateDeleteMethod } from './delete-method.generator';
import { generateFieldResolvers } from './field-resolver.generator';
import { generateFindManyMethod } from './find-many-method.generator';
import { generateFindUniqueMethod } from './find-unique-method.generator';
import { generateImports } from './imports.generator';
import { generateUpdateMethod } from './update-method.generator';

import { Model, pascal, snake } from '@trxn/hapify-core';

export function generateResolverClass(model: Model): ClassDeclarationStructure {
  const className = `${pascal(model.name)}Resolver`;
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
    decorators: [
      { name: 'Resolver', arguments: [`() => ${pascal(model.name)}`] },
    ],
    methods,
    ctors: [constructor],
  };
}

export function generateResolverSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}.resolver.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const resolverClass = generateResolverClass(model);
  const imports = generateImports(model);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(resolverClass);
}
