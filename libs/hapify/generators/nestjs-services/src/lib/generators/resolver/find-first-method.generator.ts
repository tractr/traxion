import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export const generateFindFirstMethod = (model: Model,): MethodDeclarationStructure => {

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}FindFirstArgs>`,

    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate<any>`,
      initializer: `this.prismaClient.${pascal(model.name)}`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${pascal(model.name)}FindFirstArgs`,
    }
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
       Find the first ${pascal(model.name)} that matches the filter.
       Note, that providing 'undefined' is treated as the value not being there.
       Read more here: https://pris.ly/d/null-undefined
       @param {${pascal(model.name)}FindFirstArgs} args - Arguments to find a ${pascal(model.name)}
       @example
       // Get one ${pascal(model.name)}
       const ${camel(model.name)} = await this.${camel(model.name)}Service.findFirst({
         where: {
           // ... provide filter here
         }
       })
    `,
    },
  ];


  return {
    kind: StructureKind.Method,
    name: 'findFirst',
    typeParameters,
    parameters,
    statements: `return prisma.FindFirst<T>(args);`,
    docs
  };
};