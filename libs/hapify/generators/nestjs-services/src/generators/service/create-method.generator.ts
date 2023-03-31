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
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}CreateArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}CreateArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
      Create a ${pascal(model.name)}.
      @param {${pascal(
        model.name,
      )}CreateArgs} args - Arguments to create a ${pascal(model.name)}.
      @example
      // Create one ${pascal(model.name)}
      const ${pascal(model.name)} = await this.${camel(
        model.name,
      )}Service.create({
        data: {
          // ... data to create a ${pascal(model.name)}
        }
      })
    
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'create',
    typeParameters,
    parameters,
    statements: `return prisma.create<T>(args);`,
    docs,
  };
};
