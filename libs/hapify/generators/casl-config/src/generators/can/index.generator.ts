import { kebab } from 'case';
import { Project } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateCanIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/can/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = models.map((model) => ({
    moduleSpecifier: `./${kebab(model.name)}.can`,
  }));

  sourceFile.addExportDeclarations(exportDeclarations);
}
