import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export function generateImports(): ImportDeclarationStructure[] {

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `PrismaClient` }],
    },
  ];
}
