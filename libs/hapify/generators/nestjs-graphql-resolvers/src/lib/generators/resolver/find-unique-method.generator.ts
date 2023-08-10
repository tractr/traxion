import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFindUniqueMethod(
  model: Model,
): MethodDeclarationStructure {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Query',
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
      name: '{ where }',
      type: `FindUnique${modelPascal}Args`,
      decorators: [
        { name: 'Args', arguments: ['{ nullable: true, defaultValue: {} }'] },
      ],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value as Prisma.${modelPascal}DefaultArgs;
    const ${modelCamel} =  await this.${modelCamel}Service.findUnique({where, ...select});
    return ${modelCamel};
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Query for a unique ${modelCamel}`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `findUnique${modelPascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
