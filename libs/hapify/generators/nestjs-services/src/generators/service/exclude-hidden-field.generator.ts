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

export function generateFindUniqueStatementMethod(model: Model): string {
  const hiddenFields = model.fields.filter(isHiddenField);

  return `
    const excludeKeys = [${hiddenFields
      .map(
        (field) =>
          `!!select && select?.${camel(field.name)} === true ? null : ('${camel(
            field.name,
          )}' as const)`,
      )
      .join(', ')}] as (${hiddenFields
    .map((field) => `GetPrismaKeyIfNotSelected<S, '${camel(field.name)}'>`)
    .join(' | ')})[];
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
      constraint: `Prisma.${modelName}Select`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'excludeHiddenFields',
    typeParameters,
    parameters,
    statements: generateFindUniqueStatementMethod(model),
  };
};
