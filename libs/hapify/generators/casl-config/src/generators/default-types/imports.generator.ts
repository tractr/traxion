import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

/**
 * generate import { Prisma } from '@prisma/client';
 * 
 * @returns 
 */
export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }],
    }
  ];
}

