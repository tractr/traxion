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

export const generateDeleteMethod = (
  model: Model,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'args',
      kind: StructureKind.Parameter,
      type: `Prisma.SelectSubset<T, Prisma.${pascal(model.name)}DeleteArgs>`,
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
      constraint: `Prisma.${pascal(model.name)}DeleteArgs`,
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
        Delete a ${pascal(model.name)}.
        @param {${pascal(
          model.name,
        )}DeleteArgs} args - Arguments to delete a ${pascal(model.name)}
        @example
        // Delete one ${pascal(model.name)}
        const ${camel(model.name)} = await this.${camel(
        model.name,
      )}Service.delete({
          where: {
            // ... filter to delete one ${pascal(model.name)}
          }
        })
        `,
    },
  ];

  const hiddenFields = model.fields.filter(isHiddenField);
  const modelName = camel(model.name);

  return {
    kind: StructureKind.Method,
    isAsync: true,
    name: 'delete',
    typeParameters,
    parameters,
    statements: `
    const ${modelName} = await prisma.delete<T>(args);

    ${
      hiddenFields.length
        ? `return ${modelName} === null ? ${modelName} : this.excludeHiddenFields(${modelName}, args.select);`
        : `return ${modelName};`
    }`,
    docs,
  };
};
