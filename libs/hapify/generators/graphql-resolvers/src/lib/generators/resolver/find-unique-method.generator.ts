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
  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Query',
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
      name: '{ where }',
      type: `FindUnique${model.name.pascal}Args`,
      decorators: [
        { name: 'Args', arguments: ['{ nullable: true, defaultValue: {} }'] },
      ],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value;
    const user =  await this.${model.name.camel}Service.findUnique(where, ...select);
    return user;
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Query for a unique ${model.name.camel}`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `findUnique${model.name.pascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
