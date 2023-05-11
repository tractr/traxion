import { Project } from 'ts-morph';

export function generateInterfacesIndexSourceFile(
  project: Project,
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/interfaces/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = [
    { moduleSpecifier: `./authorized-services-module-options.interface` },
  ];

  sourceFile.addExportDeclarations(exportDeclarations);
}
