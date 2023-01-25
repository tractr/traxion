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
  const decorators: DecoratorStructure[] = [
    {
      kind: StructureKind.Decorator,
      name: 'Query',
      arguments: [`() => ${model.name}`, `{ nullable: true }`],
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
      type: `FindUnique${pascal(model.name)}Args`,
      decorators: [
        { name: 'Args', arguments: ['{ nullable: true, defaultValue: {} }'] },
      ],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value;
    const user =  await this.${camel(
      model.name,
    )}Service.findUnique(where, ...select);
    return user;
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Query for a unique ${camel(model.name)}`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `findUnique${pascal(model.name)}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
