import { camel, pascal } from 'case';
import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';
import { indent } from '@trxn/hapify-devkit';

export function generateCreateManyStatementMethod(model: Model): string {
  const encryptedFields = model.fields.filter(isEncryptedField);
  const hasEncryptedFields = encryptedFields.length > 0;

  return hasEncryptedFields
    ? `
  const { data } = args;
  return prisma.createMany<T>({
    ...args,
    data: Promise.all(
      (Array.isArray(data) ? data : [data]).map((item) => this.encryptFields(item))
    ),
  });`
    : `return prisma.createMany<T>(args);`;
}

export const generateCreateManyMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}CreateManyArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}CreateManyArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: indent`
        Create many ${pascal(model.name)}s.

        @example
        // Create many ${pascal(model.name)}s
        const ${pascal(model.name)}s = await this.${camel(
        model.name,
      )}Service.createMany({
          data: {
            // ... provide data here
          }
        })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'createMany',
    typeParameters,
    parameters,
    statements: generateCreateManyStatementMethod(model),
    docs,
  };
};
