import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export const generateCreateManyMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}CreateManyArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}CreateManyArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
        Create many ${pascal(model.name)}s.
        @param {${pascal(
          model.name,
        )}CreateManyArgs} args - Arguments to create many a 
        ${pascal(model.name)}s.
        @example
        // Create many ${pascal(model.name)}s
        const ${pascal(model.name)}s = await this.${camel(
        model.name,
      )}Service.createMany({
          data: {
            *     // ... provide data here
          }
        })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'createMany',
    typeParameters,
    parameters,
    statements: `return prisma.createMany<T>(args);`,
    docs,
  };
};
