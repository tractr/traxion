import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { GraphqlResolverCaslImportPathConfig } from '../config.type';

import { getAllModelsFromRelation, Model } from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  model: Model,
  importPaths: GraphqlResolverCaslImportPathConfig,
): ImportDeclarationStructure[] {
  const modelConstant = constant(model.name);
  const modelPascal = pascal(model.name);

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '../policies',
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
      moduleSpecifier: '@casl/ability',
      namedImports: [{ name: `AnyAbility` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(
        importPaths.nestjsAuthorizedServices,
        '../..',
      ),
      namedImports: [
        { name: `${modelPascal}AuthorizedService` },
        ...getAllModelsFromRelation(model).map((relatedModel) => ({
          name: `${pascal(relatedModel.name)}AuthorizedService`,
        })),
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-core',
      namedImports: [{ name: 'CurrentAbilities' }, { name: 'Policies' }],
    },
  ];
}
