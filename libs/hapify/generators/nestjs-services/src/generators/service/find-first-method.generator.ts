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

export function generateFindFirstStatementMethod(model: Model): string {
  const modelName = camel(model.name);
  const hiddenFields = model.fields.filter(isHiddenField);

  return `const ${modelName} = await prisma.findFirst<T, false>(args);

    ${
      hiddenFields.length
        ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
        : `return ${modelName};`
    }
  `;
}

export const generateFindFirstMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}FindFirstArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}FindFirstArgs`,
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
      description: indent`Find the first ${pascal(
        model.name,
      )} that matches the filter.
        Note, that providing 'undefined' is treated as the value not being there.
        Read more here: https://pris.ly/d/null-undefined
        @param {${pascal(
          model.name,
        )}FindFirstArgs} args - Arguments to find a ${pascal(model.name)}
        @example
        // Get one ${pascal(model.name)}
        const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.findFirst({
          where: {
            // ... provide filter here
          }
        })`,
    },
  ];

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'findFirst',
    typeParameters,
    parameters,
    statements: generateFindFirstStatementMethod(model),
    docs,
  };
};
