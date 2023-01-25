import { camel, pascal, snake } from 'case';
import {
  ClassDeclarationStructure,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

export function generateDtoClass(model: Model): ClassDeclarationStructure {
  const className = `FindMany${pascal(model.name)}Output`;

  const properties: PropertyDeclarationStructure[] = [
    {
      kind: StructureKind.Property,
      // TODO: use plural helper here, when available
      name: `${camel(model.name)}s`,
      type: `${pascal(model.name)}[]`,
      hasExclamationToken: true,
      decorators: [
        { name: 'Field', arguments: [`() => [${pascal(model.name)}]`] },
      ],
    },
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'ObjectType', arguments: [] }],
    extends: 'FindManyPagination',
    properties,
  };
}

export function generateDtoSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `find-many-${snake(model.name)}-output.dto.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const dtoClass = generateDtoClass(model);
  const imports = generateImports(model);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(dtoClass);
}
