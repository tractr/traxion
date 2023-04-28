import { constant } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { GraphqlResolverCaslImportPathConfig } from '../config.type';

import { Model } from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  model: Model,
  importPaths: GraphqlResolverCaslImportPathConfig,
): ImportDeclarationStructure[] {
  const modelConstant = constant(model.name);

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.casl, '../..'),
      namedImports: [
        { name: `CREATE_${modelConstant}` },
        { name: `READ_${modelConstant}` },
        { name: `SEARCH_${modelConstant}` },
        { name: `UPDATE_${modelConstant}` },
        { name: `DELETE_${modelConstant}` },
      ],
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
