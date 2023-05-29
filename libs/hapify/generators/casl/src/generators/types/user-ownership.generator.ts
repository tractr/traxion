import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

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
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../constants`,
      namedImports: [{ name: `UserSelectOwnershipIds` }],
    },
  ];
}

export function generateUserOwnershipSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `user-with-ownership-ids.ts`;
  const filePath = `${path}/types/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  const typeAlias = sourceFile.addTypeAlias({
    name: 'UserWithOwnershipIds',
    isExported: true,

    type: `Prisma.UserGetPayload<
    typeof UserSelectOwnershipIds
  >;`,
  });

  typeAlias.addJsDoc({
    description:
      'User export type that the userService.findUnique method will return by the getSelectPrismaUserQuery function',
  });

  sourceFile.addImportDeclarations(imports);
}
