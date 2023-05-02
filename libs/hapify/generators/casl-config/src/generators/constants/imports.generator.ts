import { constant, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

/**
 * generate import { DefaultOwnershipSelect } from '../types'
 * 
 * @returns 
 */
export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `DefaultOwnershipSelect`,
      namedImports: [{ name: `../types` }],
    }
  ];
}

