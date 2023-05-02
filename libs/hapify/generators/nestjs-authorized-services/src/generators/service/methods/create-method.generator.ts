import { camel, pascal } from 'case';
import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export const generateCreateMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${modelPascal}CreateArgs>`,
    },
    {
      name: 'abilities',
      kind: StructureKind.Parameter,
      type: 'AppAbility',
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate<undefined>`,
      hasQuestionToken: true,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${modelPascal}CreateArgs`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'create',
    typeParameters,
    parameters,
    statements: `return this.${modelCamel}Service.create<T>(args, prisma);`,
  };
};
