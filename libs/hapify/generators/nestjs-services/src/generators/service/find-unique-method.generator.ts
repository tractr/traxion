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
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}FindUniqueArgs>`,
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate<any>`,
      initializer: `this.prismaClient.${camel(model.name)}`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${pascal(model.name)}FindUniqueArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
    Find zero or one ${pascal(model.name)} that matches the filter.
    @param {${pascal(
      model.name,
    )}FindUniqueArgs} args - Arguments to find a ${pascal(model.name)}
    @example
    // Get one ${pascal(model.name)}
    const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.findUnique({
      where: {
        // ... provide filter here
      }
    })
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'findUnique',
    typeParameters,
    parameters,
    statements: `return prisma.findUnique<T>(args);`,
    docs,
  };
};
