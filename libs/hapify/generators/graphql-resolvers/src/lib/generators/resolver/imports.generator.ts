import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { GraphqlResolverImportPathConfig } from '../../config.type';

import { getRelatedModelsWithoutSelf, Model } from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  model: Model,
  importPaths: GraphqlResolverImportPathConfig,
): ImportDeclarationStructure[] {
  const modelPascal = pascal(model.name);
  const modelConstant = constant(model.name);

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.graphqlDtos, '../..'),
      namedImports: [
        { name: `${modelPascal}` },
        ...getRelatedModelsWithoutSelf(model).map((relatedModels) => ({
          name: `${pascal(relatedModels.name)}`,
        })),
        { name: `FindUnique${modelPascal}Args` },
        { name: `FindMany${modelPascal}Args` },
        { name: `CreateOne${modelPascal}Args` },
        { name: `UpdateOne${modelPascal}Args` },
        { name: `DeleteOne${modelPascal}Args` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.nestjsServices, '../..'),
      namedImports: [
        { name: `${modelPascal}Service` },
        { name: `${modelConstant}_SERVICE` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/common',
      namedImports: [{ name: 'Inject' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/graphql',
      namedImports: [
        { name: 'Args' },
        { name: 'Info' },
        { name: 'Mutation' },
        { name: 'Parent' },
        { name: 'Query' },
        { name: 'ResolveField' },
        { name: 'Resolver' },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@paljs/plugins',
      namedImports: [{ name: 'PrismaSelect' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: 'graphql',
      namedImports: [{ name: 'GraphQLResolveInfo' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../dtos`,
      namedImports: [{ name: `FindMany${modelPascal}Output` }],
    },
  ];
}
