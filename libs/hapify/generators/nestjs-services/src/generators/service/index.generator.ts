import { pascal } from 'case';
import { Project, VariableDeclarationKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateServiceIndexFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `index.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: `${pascal(model.name)}Service`,
        initializer: '5',
      },
      {
        name: 'myString',
        type: 'string',
        initializer: `'my string'`,
      },
    ],
  });
}
