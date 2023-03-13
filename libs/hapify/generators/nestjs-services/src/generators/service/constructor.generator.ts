import { camel, constant, pascal } from 'case';
import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateConstructor(model: Model): ConstructorDeclarationStructure {
  return {
    kind: StructureKind.Constructor,
    parameters: [
      {
        kind: StructureKind.Parameter,
        name: `prismaClient`,
        type: `PrismaService`,
        scope: Scope.Private,
        isReadonly: true,
      },
      {
        kind: StructureKind.Parameter,
        name: `${camel(model.name)}DefaultService`,
        type: `${pascal(model.name)}DefaultService`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [
          {
            kind: StructureKind.Decorator,
            name: 'Inject',
            arguments: [`${constant(model.name)}_DEFAULT_SERVICE`],
          },
        ],
      },
    ],
  };
}
