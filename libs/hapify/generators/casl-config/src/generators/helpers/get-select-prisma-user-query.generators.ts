import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

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

export function generateGetSelectPrismaUserQuerySourceFile(
  project: Project,
  path: string,
) {
  const fileName = `get-select-prisma-user-query.ts`;
  const filePath = `${path}/helpers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  // create the function
  const getSelectPrismaUserQuery = sourceFile.addFunction({
    name: 'getSelectPrismaUserQuery',
    isExported: true,
    returnType: 'Prisma.UserSelect',
    statements: [`return UserSelectOwnershipIds.select;`],
  });

  // add the JSDoc comment
  getSelectPrismaUserQuery.addJsDoc({
    description:
      'Get the select configuration for the prisma user query to be able to construct the user with the correct ids',
  });

  sourceFile.addImportDeclarations(generateImports());
}
