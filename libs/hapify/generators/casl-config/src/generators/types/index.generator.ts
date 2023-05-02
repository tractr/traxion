import { Project } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateTypesIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
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
