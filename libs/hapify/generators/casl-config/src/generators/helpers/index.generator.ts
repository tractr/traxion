import { Project } from 'ts-morph';

export function generateHelpersIndexSourceFile(project: Project, path: string) {
  const fileName = 'index.ts';
  const filePath = `${path}/helpers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = [
    { moduleSpecifier: './get-select-prisma-user-query' },
  ];

  sourceFile.addExportDeclarations(exportDeclarations);
}
