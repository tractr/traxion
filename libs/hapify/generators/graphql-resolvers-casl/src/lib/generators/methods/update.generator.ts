import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateUpdateMethod(model: Model, resolver: ClassDeclaration) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelConstant = constant(model.name);

  const updateMethod = resolver.getMethod(`update${modelPascal}`);

  if (!updateMethod)
    throw new Error(
      `Method update${modelPascal} not found in ${resolver.getName()}`,
    );

  updateMethod.addDecorators([
    {
      name: 'Policies',
      arguments: [`UPDATE_${modelConstant}`],
    },
  ]);

  updateMethod.addParameters([
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

  updateMethod.setBodyText(`
    const select = new PrismaSelect(info, {
      defaultFields: defaultOwnershipSelect,
    }).value as Prisma.${modelPascal}Args;

    const ${modelCamel} = await this.${modelCamel}AuthorizedService.update(
      { where, data, ...select },
      abilities
    );

    return ${modelCamel};
  `);
}
