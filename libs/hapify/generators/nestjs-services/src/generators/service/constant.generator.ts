import { constant, snake } from 'case';
import { Project, VariableDeclarationKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateConstantSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-model.constants.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });
  const name = `${constant(model.name)}_SERVICE`;
  const defaultName = `${constant(model.name)}_DEFAULT_SERVICE`;

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
  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: defaultName,
        initializer: `'${defaultName}' as const`,
      },
    ],
  });
}
