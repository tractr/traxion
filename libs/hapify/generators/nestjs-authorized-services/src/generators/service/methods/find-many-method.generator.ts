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

export const generateFindManyMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${modelPascal}FindManyArgs>`,
    },
    {
      name: 'abilities',
      kind: StructureKind.Parameter,
      type: `PureAbility<
        any,
        PrismaQuery<Record<string, any> & ForcedSubject<string>>
      >`,
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
      constraint: `Prisma.${modelPascal}FindManyArgs`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'findMany',
    typeParameters,
    parameters,
    statements: [
      `const where = {
        AND: [abilities ? accessibleBy(abilities).${modelPascal} : {}, args?.where ?? {}],
      };`,
      `return this.${modelCamel}Service.findMany<T>({ ...args, where }, prisma);`,
    ],
  };
};
