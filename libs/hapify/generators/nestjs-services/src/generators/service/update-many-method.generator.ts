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

export const generateUpdateManyMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}UpdateManyArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}UpdateManyArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
       Update 0 or more ${pascal(model.name)}s.
       Note, that providing 'undefined' is treated as the value not being there.
       Read more here: https://pris.ly/d/null-undefined
       @param {${pascal(
         model.name,
       )}UpdateManyArgs} args - Arguments to update one or more ${pascal(
        model.name,
      )}s.
       @example
       // Update many ${pascal(model.name)}s
       const ${camel(model.name)}s = await this.${camel(
        model.name,
      )}Service.updateMany({
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
    name: 'updateMany',
    typeParameters,
    parameters,
    statements: `return prisma.updateMany<T>(args);`,
    docs,
  };
};
