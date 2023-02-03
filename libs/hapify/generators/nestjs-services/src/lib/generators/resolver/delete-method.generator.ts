import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export const generateDeleteMethod = (model: Model,): MethodDeclarationStructure => {

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}DeleteArgs>`,

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
      constraint: `Prisma.${pascal(model.name)}DeleteArgs`,
    }
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
    Delete a ${pascal(model.name)}.
    @param {${pascal(model.name)}DeleteArgs} args - Arguments to delete a ${pascal(model.name)}
    @example
    // Delete one ${pascal(model.name)}
    const ${camel(model.name)} = await this.${camel(model.name)}Service.delete({
      where: {
        // ... filter to delete one ${pascal(model.name)}
      }
    })
    `,
    },
  ];


  return {
    kind: StructureKind.Method,
    name: 'delete',
    typeParameters,
    parameters,
    statements: `return prisma.delete<T>(args);`,
    docs
  };
};