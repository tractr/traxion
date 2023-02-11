import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { constant, Model, pascal } from '@trxn/hapify-core';

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
      namedImports: [{ name: `${constant(model.name)}_SERVICE` }],
    },
  ];
}
