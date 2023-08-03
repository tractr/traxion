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
      type: `PureAbility<
        any,
        PrismaQuery<Record<string, any> & ForcedSubject<string>>
      >`,
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate`,
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
    statements: [
      `const create = async(client: Prisma.${modelPascal}Delegate) => {
        const ${modelCamel} = await this.${modelCamel}Service.create<T>(args, client);

        if (abilities?.cannot(Action.Create, subject('${modelPascal}', ${modelCamel})))
          throw new ForbiddenException('cannot create ${modelPascal}');

        return ${modelCamel};
      }`,
      `if (prisma) return create(prisma);`,
      `return this.prisma.$transaction((client) => create(client.${modelCamel}));`,
    ],
  };
};
