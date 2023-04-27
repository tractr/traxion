import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { GraphqlResolverCaslImportPathConfig } from '../config.type';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  importPaths: GraphqlResolverCaslImportPathConfig,
): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.casl, '../..'),
      namedImports: [{ name: `Permission` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-core',
      namedImports: [
        { name: 'CurrentAbilities' },
        { name: 'CurrentUser' },
        { name: 'Policies' },
      ],
    },
  ];
}
