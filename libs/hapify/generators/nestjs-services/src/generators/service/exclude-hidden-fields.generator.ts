import { camel, pascal } from 'case';
import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { isHiddenField, Model } from '@trxn/hapify-core';

export function generateExcludeHiddenFieldsStatementMethod(
  model: Model,
): string {
  const hiddenFields = model.fields.filter(isHiddenField);

  return `${hiddenFields
    .map(
      (field) =>
        `const ${camel(field.name)} = (!!select && select?.${camel(
          field.name,
        )} === true ? null : '${camel(
          field.name,
        )}') as ExcludePrismaField<S, '${camel(field.name)}'>;`,
    )
    .join(', ')}

    const excludeKeys = [${hiddenFields
      .map((field) => camel(field.name))
      .join(', ')}];

    return excludePrismaField(data, excludeKeys);
  `;
}

export const generateExcludeHiddenFieldGenerator = (
  model: Model,
): MethodDeclarationStructure => {
  const modelName = pascal(model.name);
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'data',
      kind: StructureKind.Parameter,
      type: `T`,
    },
    {
      name: 'select',
      kind: StructureKind.Parameter,
      initializer: 'null',
      type: `S | null`,
    },
  ];

  const typeParameters: OptionalKind<TypeParameterDeclarationStructure>[] = [
    {
      name: 'T',
      kind: StructureKind.TypeParameter,
      constraint: `${modelName}`,
    },
    {
      name: 'S',
      kind: StructureKind.TypeParameter,
      constraint: `Prisma.${modelName}Select | undefined | null`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'excludeHiddenFields',
    typeParameters,
    parameters,
    statements: generateExcludeHiddenFieldsStatementMethod(model),
  };
};
