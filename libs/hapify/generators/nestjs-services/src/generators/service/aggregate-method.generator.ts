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

export const generateAggregateMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}AggregateArgs>`,
    },
    {
      kind: StructureKind.Parameter,
      name: 'prisma',
      type: `Prisma.${pascal(model.name)}Delegate<GlobalRejectSettings>`,
      initializer: `this.prismaClient.${camel(model.name)}`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${pascal(model.name)}AggregateArgs`,
    },
    {
      name: 'GlobalRejectSettings',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: indent`
        Allows you to perform aggregations operations on a ${pascal(
          model.name,
        )}.
        Note, that providing 'undefined' is treated as the value not being there.
        Read more here: https://pris.ly/d/null-undefined
        @param {${pascal(
          model.name,
        )}AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
        @example
        // Ordered by age ascending
        // Where email contains prisma.io
        // Limited to the 10 ${camel(model.name)}s
        const aggregations = await this.${camel(model.name)}Service.aggregate({
          avg: {
            age: true,
          },
          where: {
            email: {
              contains: "prisma.io",
            },
          },
          orderBy: {
            age: "asc",
          },
          take: 10,
        })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'aggregate',
    typeParameters,
    parameters,
    statements: `return prisma.aggregate<T>(args);`,
    docs,
  };
};
