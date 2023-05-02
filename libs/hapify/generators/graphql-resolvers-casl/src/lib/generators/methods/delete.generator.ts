import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateDeleteMethod(model: Model, resolver: ClassDeclaration) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  const deleteMethod = resolver.getMethod(`delete${modelPascal}`);

  if (!deleteMethod)
    throw new Error(
      `Method delete${modelPascal} not found in ${resolver.getName()}`,
    );

  deleteMethod?.addDecorators([
    {
      name: 'Policies',
      arguments: [`DELETE_${modelConstant}`],
    },
  ]);

  deleteMethod.addParameters([
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
  deleteMethod.setBodyText(`
    const select = new PrismaSelect(info, {
      defaultFields: defaultOwnershipSelect,
    }).value as Prisma.${modelPascal}Args;

    const ${modelCamel} = await this.${modelCamel}AuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return ${modelCamel};
  `);
}
