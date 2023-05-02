import { Project } from 'ts-morph';
import { generateImports } from './imports.generator';

export function generateHelpersSourceFile(project: Project, path: string) {
  const fileName = `get-select-prisma-user-query.ts`;
  const filePath = `helpers/${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  // create the function
const func = sourceFile.addFunction({
  name: "getSelectPrismaUserQuery",
  isExported: true,
  returnType: "Prisma.UserSelect",
  // bodyText: "return UserSelectOwnershipIds.select;",  //TODO: bodyText is not working
});

// add the JSDoc comment
func.addJsDoc({
  description:
    "Get the select configuration for the prisma user query to be able to construct the user with the correct ids",
});

  sourceFile.addImportDeclarations(imports);
}
