import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

/**
 * generate import { Prisma } from '@prisma/client';
 *
 * @returns
 */
export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/ability`,
      namedImports: [{ name: `AbilityBuilder` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '../types/app-ability',
      namedImports: [{ name: `AppAbility` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '../types/user-with-ownership-ids',
      namedImports: [{ name: `UserWithOwnershipIds` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/common',
      namedImports: [{ name: `getConcatValueByPath` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-casl',
      namedImports: [{ name: `Action` }],
    },
  ];
}
