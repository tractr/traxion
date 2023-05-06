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

export const generateDeleteMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${modelPascal}DeleteArgs>`,
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
      constraint: `Prisma.${modelPascal}DeleteArgs`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'delete',
    typeParameters,
    parameters,
    statements: [
      `const deleteCb = async(client: Prisma.${modelPascal}Delegate<undefined>) => {
        const ${modelCamel} = await this.${modelCamel}Service.delete<T>(args, client);

        if (abilities?.cannot(Action.Delete, subject('${modelPascal}', ${modelCamel})))
          throw new ForbiddenException('cannot delete ${modelPascal}');

        return ${modelCamel};
      }`,
      `if (prisma) return deleteCb(prisma);`,
      `return this.prisma.$transaction((client) => deleteCb(client.${modelCamel}));`,
    ],
  };
};
