import { constant, kebab, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  const modelPascal = pascal(model.name);
  const modelConstant = constant(model.name);

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: 'Injectable' }, { name: 'Inject' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: 'Prisma' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `test`,
      namedImports: [
        { name: `${modelPascal}Service` },
        { name: `${modelConstant}_SERVICE` },
      ],
    },
  ];
}
