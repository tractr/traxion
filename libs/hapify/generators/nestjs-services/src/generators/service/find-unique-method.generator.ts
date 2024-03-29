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
import { indent } from '@trxn/hapify-devkit';

export function generateFindUniqueStatementMethod(model: Model): string {
  const modelName = camel(model.name);
  const hiddenFields = model.fields.filter(isHiddenField);

  return `
    const ${modelName} = await prisma.findUnique<T, false>(args);

    ${
      hiddenFields.length
        ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
        : `return ${modelName};`
    }
  `;
}

export const generateFindUniqueMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(
        model.name,
      )}FindUniqueArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}FindUniqueArgs`,
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
    Find zero or one ${pascal(model.name)} that matches the filter.
    @param {${pascal(
      model.name,
    )}FindUniqueArgs} args - Arguments to find a ${pascal(model.name)}
    @example
    // Get one ${pascal(model.name)}
    const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.findUnique({
      where: {
        // ... provide filter here
      }
    })
    `,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'findUnique',
    typeParameters,
    parameters,
    statements: generateFindUniqueStatementMethod(model),
    docs,
  };
};
