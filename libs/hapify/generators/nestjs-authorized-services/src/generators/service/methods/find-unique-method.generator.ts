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

export const generateFindUniqueMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}FindUniqueArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}FindUniqueArgs`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'findUnique',
    typeParameters,
    parameters,
    statements: [
      `const ${modelCamel} = await this.${modelCamel}Service.findUnique<T>(args, prisma);`,
      `if (${modelCamel} && abilities?.cannot(Action.Read, subject('${modelPascal}', ${modelCamel})))`,
      `  throw new ForbiddenException('cannot read this user');`,
      `return ${modelCamel}`,
    ],
  };
};
