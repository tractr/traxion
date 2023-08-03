import { camel, pascal } from 'case';
import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { isEncryptedField, isHiddenField, Model } from '@trxn/hapify-core';
import { indent } from '@trxn/hapify-devkit';

export function generateUpsertStatementMethod(model: Model): string {
  const hiddenFields = model.fields.filter(isHiddenField);
  const modelName = camel(model.name);

  const encryptedFields = model.fields.filter(isEncryptedField);
  const hasEncryptedFields = encryptedFields.length > 0;

  return `${
    hasEncryptedFields
      ? ` const { create, update } = args;
          const ${modelName} = await prisma.upsert<T>({
            ...args,
            create: await this.encryptFields(create),
            update: await this.encryptFields(update),
          });`
      : `const ${modelName} = await prisma.upsert<T>(args);`
  }
  ${
    hiddenFields.length
      ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
      : `return ${modelName};`
  }`;
}

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
      type: `Prisma.${pascal(model.name)}Delegate`,
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
      description: indent`
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
       })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'upsert',
    typeParameters,
    parameters,
    statements: generateUpsertStatementMethod(model),
    docs,
  };
};
