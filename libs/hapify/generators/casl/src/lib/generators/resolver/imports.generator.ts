import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { constant, kebab, Model, pascal } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }, { name: model.name }],
    },
  ];
}
