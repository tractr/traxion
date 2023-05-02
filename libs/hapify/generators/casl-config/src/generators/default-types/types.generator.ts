import { Project } from 'ts-morph';
import { generateImports } from './imports.generator';

export function generateTypesSourceFile(project: Project, path: string) {
  const fileName = `default-ownership-select.ts`;
  const filePath = `types/${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  sourceFile.addTypeAlias({
    name: "DefaultOwnershipSelect",
    isExported: true,
    type: `{
      User: Prisma.UserSelect;
    };`,
    });

  sourceFile.addImportDeclarations(imports);
}
