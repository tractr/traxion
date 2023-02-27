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

export const generateUpdateMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}UpdateArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}UpdateArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
       Update a ${pascal(model.name)}.
       @param {${pascal(
         model.name,
       )}UpdateArgs} args - Arguments to update a ${pascal(model.name)}.
       @example
       // Update one ${pascal(model.name)}
       const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.update({
         where: {
           // ... provide filter here
         },
         data: {
           // ... provide data here
         }
       })
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'update',
    typeParameters,
    parameters,
    statements: `return prisma.update<T>(args);`,
    docs,
  };
};
