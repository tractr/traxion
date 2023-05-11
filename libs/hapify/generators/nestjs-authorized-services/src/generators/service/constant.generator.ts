import { constant, snake } from 'case';
import { Project, VariableDeclarationKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateConstantSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-authorized-service.constants.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${constant(model.name)}_AUTHORIZED_SERVICE`;

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name,
        initializer: `'${name}' as const`,
      },
    ],
  });
}
