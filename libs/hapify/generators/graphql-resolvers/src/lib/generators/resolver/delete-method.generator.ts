import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { camel, Model, pascal } from '@trxn/hapify-core';

export function generateDeleteMethod(model: Model): MethodDeclarationStructure {
  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Mutation',
      arguments: [`() => ${pascal(model.name)}`, `{ nullable: true }`],
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
      type: `DeleteOne${pascal(model.name)}Args`,
      decorators: [{ name: 'Args', arguments: [] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info, {
      defaultFields: OWNERS_DEFAULT_FIELDS,
    }).value;

    const user = await this.userService.delete(
      { where, ...select },
      prisma.user,
    );

    return user;
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Delete a single ${pascal(model.name)}.`,
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
