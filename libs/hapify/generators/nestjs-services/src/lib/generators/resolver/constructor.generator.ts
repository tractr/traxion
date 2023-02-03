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
        name: `prismaClient`,
        type: `PrismaClient`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [
          {
            kind: StructureKind.Decorator,
            name: 'Inject',
            arguments: [`DATABASE_SERVICE`],
          },
        ],
      },
    ],
  };
}
