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

export const generateCountMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${modelPascal}CountArgs>`,
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
      type: `Prisma.${pascal(model.name)}Delegate<GlobalRejectSettings>`,
      hasQuestionToken: true,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${modelPascal}CountArgs`,
    },
    {
      name: 'GlobalRejectSettings',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'count',
    typeParameters,
    parameters,
    statements: [
      `const where = {
        AND: [abilities ? accessibleBy(abilities).${modelPascal} : {}, args?.where ?? {}],
      };`,
      `return this.${modelCamel}Service.count<T, GlobalRejectSettings>({ ...args, where });`,
    ],
  };
};
