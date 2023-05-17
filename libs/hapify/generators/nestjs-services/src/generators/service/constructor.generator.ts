import { camel, constant, pascal } from 'case';
import {
  ConstructorDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';

export function generateConstructor(
  model: Model,
): ConstructorDeclarationStructure {
  const parameters: OptionalKind<ParameterDeclarationStructure>[] = [
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
  ];

  const hasEncryptedFields = model.fields.filter(isEncryptedField).length > 0;
  if (hasEncryptedFields) {
    parameters.push({
      kind: StructureKind.Parameter,
      name: `encryptionService`,
      type: `EncryptionService`,
      scope: Scope.Private,
      isReadonly: true,
    });
  }

  return {
    kind: StructureKind.Constructor,
    parameters,
  };
}
