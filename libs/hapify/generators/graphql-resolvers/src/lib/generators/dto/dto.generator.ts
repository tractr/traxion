import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

export function generateDtorClass(model: Model): ClassDeclarationStructure {
  const className = `${model.name.pascal}Resolver`;

  const methods = [];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [
      { name: 'Resolver', arguments: [`() => ${model.name.pascal}`] },
    ],
  };
}

export function generateDtoSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${model.name.snake}.resolver.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const resolverClass = generateDtorClass(model);
  const imports = generateImports(model);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(resolverClass);
}
