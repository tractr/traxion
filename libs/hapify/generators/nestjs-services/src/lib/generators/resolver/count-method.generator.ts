import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export const generateCountMethod = (model: Model,): MethodDeclarationStructure => {

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}CountArgs>`,

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
      constraint: `Prisma.${pascal(model.name)}CountArgs`,
    }
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
      Count the number of ${pascal(model.name)}.
      Note, that providing 'undefined' is treated as the value not being there.
      Read more here: https://pris.ly/d/null-undefined
      @param {${pascal(model.name)}CountArgs} args - Arguments to filter ${pascal(model.name)}s to count.
      @example
      // Count one ${pascal(model.name)}
      const ${pascal(model.name)} = await this.${camel(model.name)}Service.count({
        data: {
          // ... data to count a ${pascal(model.name)}
        }
      })
    
    `,
    },
  ];


  return {
    kind: StructureKind.Method,
    name: 'count',
    typeParameters,
    parameters,
    statements: `return prisma.count<T>(args);`,
    docs
  };
};