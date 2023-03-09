import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateCreateMethod(model: Model): MethodDeclarationStructure {
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
      name: `{ data: rawData }`,
      type: `CreateOne${modelPascal}Args`,
      decorators: [{ name: 'Args', arguments: [] }],
    },
  ];

  const statements = `
    const select = new PrismaSelect(info).value;

    const data = {
      ...this.${modelCamel}Service.getDefaultInternals(),
      ...rawData,
    };

    const ${modelCamel} = await this.${modelCamel}Service.create({ data, ...select });

    return ${modelCamel};
  `;

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Create a single ${modelCamel}.`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: `create${modelPascal}`,
    isAsync: true,
    decorators,
    parameters,
    statements,
    docs,
  };
}
