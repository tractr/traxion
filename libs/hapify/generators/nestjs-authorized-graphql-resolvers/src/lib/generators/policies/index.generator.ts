import { kebab } from 'case';
import { Project } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generatePoliciesIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/policies/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = models.map((model) => ({
    moduleSpecifier: `./${kebab(model.name)}.policy`,
  }));

  sourceFile.addExportDeclarations(exportDeclarations);
}
