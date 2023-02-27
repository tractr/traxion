import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `Provider` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../constants`,
      namedImports: [{ name: `${constant(model.name)}_SERVICE` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../services`,
      namedImports: [{ name: `${pascal(model.name)}Service` }],
    },
  ];
}
