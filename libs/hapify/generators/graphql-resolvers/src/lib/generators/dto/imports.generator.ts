import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { constant, Model, pascal } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../../generated/prisma-nestjs-graphql`,
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
