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
import { indent } from '@trxn/hapify-devkit';

export const generateDeleteManyMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}DeleteManyArgs>`,
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate`,
      initializer: `this.prismaClient.${camel(model.name)}`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${pascal(model.name)}DeleteArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: indent`
    Delete 0 or more ${pascal(model.name)}s.
    @param {${pascal(
      model.name,
    )}DeleteArgs} args - Arguments to filter  ${pascal(model.name)}s to delete.
    @example
    // Delete a few ${pascal(model.name)}s
    const ${camel(model.name)}s = await this.${camel(
        model.name,
      )}Service.deleteMany({
      where: {
        // ... provide filter here
      }
    })
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'deleteMany',
    typeParameters,
    parameters,
    statements: `return prisma.deleteMany<T>(args);`,
    docs,
  };
};
