import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { constant, kebab, Model, pascal } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../../generated/prisma-nestjs-graphql`,
      namedImports: [
        { name: `${pascal(model.name)}` },
        ...model.dependencies.map((dependency) => ({
          name: `${pascal(dependency.name)}`,
        })),
        { name: `FindUnique${pascal(model.name)}Args` },
        { name: `FindMany${pascal(model.name)}Args` },
        { name: `CreateOne${pascal(model.name)}Args` },
        { name: `UpdateOne${pascal(model.name)}Args` },
        { name: `DeleteOne${pascal(model.name)}Args` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/generated-nestjs-models-common',
      namedImports: [
        { name: `${pascal(model.name)}Service` },
        { name: `${constant(model.name)}_SERVICE` },
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
      moduleSpecifier: `./find-many-${kebab(model.name)}-output.dto`,
      namedImports: [{ name: `FindMany${pascal(model.name)}Output` }],
    },
  ];
}
