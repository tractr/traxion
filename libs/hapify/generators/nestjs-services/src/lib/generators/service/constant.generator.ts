import { Project, VariableDeclarationKind } from 'ts-morph';

import { constant, Model, snake } from '@trxn/hapify-core';

export function generateConstantSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-model.constants.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${constant(model.name)}_SERVICE`;
  const databaseName = `${constant(model.name)}_DATABASE_SERVICE`;

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
