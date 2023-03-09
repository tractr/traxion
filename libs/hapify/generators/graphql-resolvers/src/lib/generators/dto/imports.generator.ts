import { pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model } from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  model: Model,
  importPaths: GraphqlResolverImportPathConfig,
): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.graphqlDtos, '../..'),
      namedImports: [
        { name: `${pascal(model.name)}` },
        { name: `FindUnique${pascal(model.name)}Args` },
        { name: `FindMany${pascal(model.name)}Args` },
        { name: `CreateOne${pascal(model.name)}Args` },
        { name: `UpdateOne${pascal(model.name)}Args` },
        { name: `DeleteOne${pascal(model.name)}Args` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-graphql',
      namedImports: [{ name: 'FindManyPagination' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/graphql',
      namedImports: [{ name: 'Field' }, { name: 'ObjectType' }],
    },
  ];
}
