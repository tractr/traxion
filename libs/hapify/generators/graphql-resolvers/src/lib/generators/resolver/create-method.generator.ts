import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateCreateMethod(model: Model): MethodDeclarationStructure {
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
      name: `{ data: rawData }`,
      type: `CreateOne${model.name.pascal}Args`,
      decorators: [{ name: 'Args', arguments: [] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info, {
      defaultFields: OWNERS_DEFAULT_FIELDS,
    }).value;

    const data = {
      ...this.userService.getDefaultInternals(),
      ...rawData,
    };

    const user = await this.userService.create(
      { data, ...select },
      prisma.user,
    );

    return user;
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Create a single ${model.name.camel}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `create${model.name.pascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
