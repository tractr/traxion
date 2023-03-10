import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `Inject` }, { name: 'Injectable' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-database`,
      namedImports: [{ name: 'PrismaService' }],
    },
  ];
}
