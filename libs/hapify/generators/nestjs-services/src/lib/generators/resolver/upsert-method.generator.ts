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

export const generateUpsertMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}UpsertArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}UpsertArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
      Create or update one ${pascal(model.name)}.
       @param {${pascal(
         model.name,
       )}UpsertArgs} args - Arguments to update or create a ${pascal(
        model.name,
      )}.
       @example
       // Upsert one ${pascal(model.name)}
       const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.upsert({
         create: {
           // ... data to create a ${pascal(model.name)}
         },
         update: {
           // ... in case it already exists, update
         },
         where: {
           // ... the filter for the ${pascal(model.name)} we want to update
         }
       })
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'upsert',
    typeParameters,
    parameters,
    statements: `return prisma.upsert<T>(args);`,
    docs,
  };
};
