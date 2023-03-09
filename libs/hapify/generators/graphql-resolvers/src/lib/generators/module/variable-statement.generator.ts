import { pascal } from 'case';
import {
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateProvidersVariableStatement(
  models: Model[],
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'providers',
        initializer: `[
  DateScalar,
  ${models.map((model) => `${pascal(model.name)}Resolver`).join(',')}
]`,
      },
    ],
  };
}
