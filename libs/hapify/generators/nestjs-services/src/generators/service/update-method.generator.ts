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

export function generateUpdateStatementMethod(model: Model): string {
  const hiddenFields = model.fields.filter(isHiddenField);
  const modelName = camel(model.name);

  const encryptedFields = model.fields.filter(isEncryptedField);
  const hasEncryptedFields = encryptedFields.length > 0;

  return `${
    hasEncryptedFields
      ? ` const { data } = args;
          const ${modelName} = await prisma.update<T>({
            ...args,
            data: await this.encryptFields(data),
          });`
      : `const ${modelName} = await prisma.update<T>(args);`
  }
  ${
    hiddenFields.length
      ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
      : `return ${modelName};`
  }`;
}

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
      type: `Prisma.${pascal(model.name)}Delegate`,
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
      description: indent`
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
       })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'update',
    typeParameters,
    parameters,
    statements: generateUpdateStatementMethod(model),
    docs,
  };
};
