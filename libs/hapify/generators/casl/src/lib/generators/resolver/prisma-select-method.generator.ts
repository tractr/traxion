import {
  FunctionDeclarationStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  StructureKind,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export function generatePrismaSelectMethod(
  model: Model,
): OptionalKind<FunctionDeclarationStructure> {
  const methodName = `getSelectPrisma${model.name}Query`;
  const returnType = `Prisma.${model.name}Select`;
  const methodBody = `return {} as ${returnType};`;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `
      Get the select configuration for the prisma user query 
      to be able to construct the ${camel(model.name)} with the correct ids.`,
    },
  ];

  return {
    kind: StructureKind.Function,
    name: methodName,
    returnType,
    isExported: true,
    statements: [methodBody],
    docs,
  };
}
