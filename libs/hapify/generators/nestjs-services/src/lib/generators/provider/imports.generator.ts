import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import {  Model, pascal } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `Provider` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./services`,
      namedImports: [{ name: `${pascal(model.name)}Service` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./${model.name.toLowerCase()}-model.constants`,
      namedImports: [{ name: `${model.name.toUpperCase()}_SERVICE` }],
    },
  ];
}
