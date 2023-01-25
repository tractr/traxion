import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../../generated/prisma-nestjs-graphql`,
      namedImports: [
        { name: `${model.name.pascal}` },
        { name: `FindUnique${model.name.pascal}Args` },
        { name: `FindMany${model.name.pascal}Args` },
        { name: `CreateOne${model.name.pascal}Args` },
        { name: `UpdateOne${model.name.pascal}Args` },
        { name: `DeleteOne${model.name.pascal}Args` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/generated-nestjs-models-common',
      namedImports: [
        { name: `${model.name.pascal}Service` },
        { name: `${model.name.constant}_SERVICE` },
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
  ];
}
