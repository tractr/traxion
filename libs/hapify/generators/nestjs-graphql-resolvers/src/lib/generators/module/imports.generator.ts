import { pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(models: Model[]): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/common',
      namedImports: [{ name: 'Module' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-graphql',
      namedImports: [{ name: 'DateScalar' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./resolvers`,
      namedImports: models.map((model) => ({
        name: `${pascal(model.name)}Resolver`,
      })),
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./graphql.module-definition`,
      namedImports: [
        {
          name: `ConfigurableModuleClass`,
        },
      ],
    },
  ];
}
