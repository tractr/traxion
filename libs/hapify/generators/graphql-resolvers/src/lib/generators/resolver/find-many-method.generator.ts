import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFindManyMethod(
  model: Model,
): MethodDeclarationStructure {
  const modelPluralCamel = camel(model.pluralName);
  const modelPluralPascal = pascal(model.pluralName);
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);

  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Query',
      arguments: [`() => FindMany${modelPascal}Output`],
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
      name: `
        {
          where,
          cursor,
          distinct,
          orderBy = [{ id: 'asc' }],
          skip = 0,
          take = 100,
        }
      `,
      type: `FindMany${modelPascal}Args`,
      decorators: [{ name: 'Args', arguments: ['{ nullable: true }'] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).valueOf('${modelPluralCamel}', '${modelPascal}') as Prisma.${modelPascal}Args;

    const ${modelPluralCamel} = await this.${modelCamel}Service.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.${modelCamel}Service.count({
      where,
    });

    return {
      ${modelPluralCamel}: ${modelPluralCamel}.slice(0, take),
      count,
      hasNextPage: typeof ${modelPluralCamel}[take] !== 'undefined',
    };
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Query for multiple ${modelPluralCamel}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `findMany${modelPluralPascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
