import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateCreateMethod(model: Model, resolver: ClassDeclaration) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  const createMethod = resolver.getMethod(`create${modelPascal}`);

  if (!createMethod)
    throw new Error(
      `Method create${modelPascal} not found in ${resolver.getName()}`,
    );

  createMethod.addDecorators([
    {
      name: 'Policies',
      arguments: [`CREATE_${modelConstant}`],
    },
  ]);

  createMethod.addParameters([
    {
      kind: StructureKind.Parameter,
      name: 'abilities',
      type: 'AppAbility',
      decorators: [
        {
          name: 'CurrentAbilities',
          arguments: [],
        },
      ],
    },
  ]);

  createMethod.setBodyText(`
    const select = new PrismaSelect(info, {
      defaultFields: defaultOwnershipSelect,
    }).value as Prisma.${modelPascal}Args;

    const ${modelCamel} = await this.${modelCamel}AuthorizedService.create({ data, ...select }, abilities);

    return ${modelCamel};
  `);
}
