import { camel, kebab, pascal } from 'case';
import {
  ClassDeclarationStructure,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { generateImports } from './imports.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

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
  importPaths: GraphqlResolverImportPathConfig,
) {
  const fileName = `find-many-${kebab(model.name)}-output.dto.ts`;
  const filePath = `${path}/dtos/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const dtoClass = generateDtoClass(model);
  const imports = generateImports(model, importPaths);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(dtoClass);
}
