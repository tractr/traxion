import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

/**
 * generate :
 * import { Prisma } from '@prisma/client';
 * import { UserSelectOwnershipIds } from '../constants';
 * 
 * @returns 
 */
export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../constants`,
      namedImports: [{ name: `UserSelectOwnershipIds` }],
    }
  ];
}

