import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export function generateFindManyMethod(
  model: Model,
): MethodDeclarationStructure {
  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Query',
      arguments: [`() => FindMany${pascal(model.name)}Output`],
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
      type: `FindMany${pascal(model.name)}Args`,
      decorators: [{ name: 'Args', arguments: ['{ nullable: true }'] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info, {
      defaultFields: OWNERS_DEFAULT_FIELDS,
    }).valueOf('users', 'User');

    const users = await this.userService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.userService.count({
      where,
    });

    return {
      users: users.slice(0, take),
      count,
      hasNextPage: typeof users[take] !== 'undefined',
    };
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Query for multiple ${camel(model.name)}s.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `findMany${pascal(model.name)}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
