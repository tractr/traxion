import { camel, pascal } from 'case';
import {
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';

export function generateEncryptFieldsStatementMethod(model: Model): string {
  const encryptedFields = model.fields.filter(isEncryptedField);

  return `let encryptedData = {};
  ${encryptedFields
    .map(
      (field) =>
        `if (data.${camel(field.name)}) {
          const ${camel(field.name)} =
            typeof data.${camel(field.name)} === 'string'
              ? data.${camel(field.name)}
              : data.${camel(field.name)}.set;
          if (${camel(field.name)}) {
            const encrypted${pascal(
              field.name,
            )} = await this.encryptionService.encrypt(${camel(field.name)});
            encryptedData = {
              ...encryptedData,
              ${camel(field.name)}:
                typeof data.${camel(field.name)} === 'string'
                  ? encrypted${pascal(field.name)}
                  : { set: encrypted${pascal(field.name)} },
            };
          }
        }`,
    )
    .join('\n')}

      return {
        ...data,
        ...encryptedData,
      };`;
}

export const generateEncryptFieldsGenerator = (
  model: Model,
): MethodDeclarationStructure => {
  const modelName = pascal(model.name);
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'data',
      kind: StructureKind.Parameter,
      type: `T`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `{
        ${model.fields
          .filter(isEncryptedField)
          .map(
            (field) =>
              `${camel(field.name)}?: ${modelName}['${camel(field.name)}']${
                field.type === 'string'
                  ? ' | Prisma.StringFieldUpdateOperationsInput;'
                  : ''
              }`,
          )
          .join(',\n')}
      }`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'encryptFields',
    returnType: `Promise<T>`,
    isAsync: true,
    typeParameters,
    parameters,
    statements: generateEncryptFieldsStatementMethod(model),
  };
};
