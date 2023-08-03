import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateDeleteMethod(model: Model): MethodDeclarationStructure {
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
      name: `{ where }`,
      type: `DeleteOne${modelPascal}Args`,
      decorators: [{ name: 'Args', arguments: [] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value as Prisma.${modelPascal}DefaultArgs;

    const ${modelCamel} = await this.${modelCamel}Service.delete({ where, ...select });

    return ${modelCamel};
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Delete a single ${modelPascal}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `delete${pascal(model.name)}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
