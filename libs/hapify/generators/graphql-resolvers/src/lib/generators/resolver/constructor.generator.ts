import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateConstructor(
  model: Model,
): ConstructorDeclarationStructure {
  return {
    kind: StructureKind.Constructor,
    parameters: [
      {
        kind: StructureKind.Parameter,
        name: `${model.name.camel}Service`,
        type: `${model.name.pascal}Service`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [
          {
            kind: StructureKind.Decorator,
            name: 'Inject',
            arguments: [`${model.name.constant}_SERVICE`],
          },
        ],
      },
    ],
  };
}
