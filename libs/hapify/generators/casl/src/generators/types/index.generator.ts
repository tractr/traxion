import { Project } from 'ts-morph';

export function generateTypesIndexSourceFile(project: Project, path: string) {
  const fileName = 'index.ts';
  const filePath = `${path}/types/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = [
    { moduleSpecifier: './app-ability' },
    { moduleSpecifier: './default-ownership-select' },
    { moduleSpecifier: './user-with-ownership-ids' },
  ];

  sourceFile.addExportDeclarations(exportDeclarations);
}
