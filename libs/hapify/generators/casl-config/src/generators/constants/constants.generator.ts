import { Project, VariableDeclarationKind } from 'ts-morph';
import { generateImports } from './imports.generator';

export function generateConstantsSourceFile(project: Project, path: string) {
  const fileName = `default-ownership-select.ts`;
  const filePath = `constants/${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  // create the object literal
const objectLiteral = {
  User: {
    id: true,
  },
};

// create the variable declaration
const variableDeclaration = sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [
    {
      name: "defaultOwnershipSelect",
      type: "DefaultOwnershipSelect",
      initializer: writer => writer.write(JSON.stringify(objectLiteral)),
    },
  ],
  isExported: true,
});

  sourceFile.addImportDeclarations(imports);
}
