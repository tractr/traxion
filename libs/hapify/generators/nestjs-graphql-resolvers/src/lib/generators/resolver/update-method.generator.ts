import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateUpdateMethod(model: Model): MethodDeclarationStructure {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Mutation',
      arguments: [`() => ${modelPascal}`, `{ nullable: true }`],
    },
  ];

  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'info',
      kind: StructureKind.Parameter,
      type: 'GraphQLResolveInfo',
      decorators: [{ name: 'Info', arguments: [] }],
    },
    {
      kind: StructureKind.Parameter,
      name: `{ data, where }`,
      type: `UpdateOne${modelPascal}Args`,
      decorators: [{ name: 'Args', arguments: [] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value as Prisma.${modelPascal}DefaultArgs;

    const ${modelCamel} = await this.${modelCamel}Service.update({ where, data, ...select });

    return ${modelCamel};
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Update a single ${modelCamel}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `update${modelPascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
