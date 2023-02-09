import { names } from '@nrwl/devkit';
import { Project, VariableDeclarationKind } from 'ts-morph';

import { Model, pascal, snake } from '@trxn/hapify-core';

export function generateConstantsSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-model.constants.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${model.name.toUpperCase()}_SERVICE`;
  const databaseName = `${model.name.toUpperCase()}_DATABASE_SERVICE`;

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name,
        initializer: `'${name}'`,
      },
    ],
  });
  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: databaseName,
        initializer: `'${databaseName}'`,
      },
    ],
  });
}
