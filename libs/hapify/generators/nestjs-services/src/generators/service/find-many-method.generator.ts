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
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}FindManyArgs>`,
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate<undefined>`,
      initializer: `this.prismaClient.${camel(model.name)}`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${pascal(model.name)}FindManyArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
       Find zero or more ${pascal(model.name)}s that matches the filter.
       Note, that providing 'undefined' is treated as the value not being there.
       Read more here: https://pris.ly/d/null-undefined
       @param {${pascal(
         model.name,
       )}FindManyArgs=} args - Arguments to filter and select certain fields only.
       @example
       // Get all ${pascal(model.name)}s
       const ${camel(model.name)}s = await this.${camel(
        model.name,
      )}Service.findMany()

       // Get first 10 ${pascal(model.name)}s
       const ${pascal(model.name)}s = await this.${pascal(
        model.name,
      )}Service.findMany({ take: 10 })

       // Only select the 'id'
       const ${camel(model.name)}WithIdOnly = await this.${pascal(
        model.name,
      )}Service.findMany({ select: { id: true } })

    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'findMany',
    typeParameters,
    parameters,
    statements: `return prisma.findMany<T>(args);`,
    docs,
  };
};
