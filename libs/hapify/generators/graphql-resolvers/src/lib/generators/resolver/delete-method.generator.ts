import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateDeleteMethod(model: Model): MethodDeclarationStructure {
  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Mutation',
      arguments: [`() => ${model.name.pascal}`, `{ nullable: true }`],
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
      type: `DeleteOne${model.name.pascal}Args`,
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
      description: `Delete a single ${model.name.camel}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `delete${model.name.pascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
