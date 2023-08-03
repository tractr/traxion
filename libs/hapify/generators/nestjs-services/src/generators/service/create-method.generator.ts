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

export function generateCreateStatementMethod(model: Model): string {
  const hiddenFields = model.fields.filter(isHiddenField);
  const modelName = camel(model.name);

  const encryptedFields = model.fields.filter(isEncryptedField);
  const hasEncryptedFields = encryptedFields.length > 0;

  return `${
    hasEncryptedFields
      ? ` const { data } = args;
          const ${modelName} = await prisma.create<T>({
            ...args,
            data: await this.encryptFields(data),
          });`
      : ` const ${modelName} = await prisma.create<T>(args);`
  }
  ${
    hiddenFields.length
      ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
      : `return ${modelName};`
  }`;
}

export const generateCreateMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}CreateArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}CreateArgs`,
    },
  ];

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: indent`
      Create a ${pascal(model.name)}.
      @param {${pascal(
        model.name,
      )}CreateArgs} args - Arguments to create a ${pascal(model.name)}.
      @example
      // Create one ${pascal(model.name)}
      const ${pascal(model.name)} = await this.${camel(
        model.name,
      )}Service.create({
        data: {
          // ... data to create a ${pascal(model.name)}
        }
      })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'create',
    typeParameters,
    parameters,
    statements: generateCreateStatementMethod(model),
    docs,
  };
};
