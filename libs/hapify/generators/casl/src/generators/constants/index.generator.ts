import { Project } from 'ts-morph';

export function generateConstantsIndexSourceFile(
  project: Project,
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = [
    { moduleSpecifier: `./user-select-ownership-ids.constant` },
    { moduleSpecifier: `./default-ownership-select.constant` },
  ];

  sourceFile.addExportDeclarations(exportDeclarations);
}
