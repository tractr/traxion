import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFindManyMethod(
  model: Model,
  resolver: ClassDeclaration,
) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelPluralCamel = camel(model.pluralName);
  const modelConstant = constant(model.name);

  const findManyMethod = resolver.getMethod(`findMany${modelPluralPascal}`);

  if (!findManyMethod)
    throw new Error(
      `Method findMany${modelPluralPascal} not found in ${resolver.getName()}`,
    );

  findManyMethod.addDecorators([
    {
      name: 'Policies',
      arguments: [`SEARCH_${modelConstant}`],
    },
  ]);

  findManyMethod.addParameters([
    {
      kind: StructureKind.Parameter,
      name: 'abilities',
      type: 'AnyAbility',
      decorators: [
        {
          name: 'CurrentAbilities',
          arguments: [],
        },
      ],
    },
  ]);

  findManyMethod.setBodyText(`
    const select = new PrismaSelect(info, {
      defaultFields: defaultOwnershipSelect,
    }).valueOf('${modelPluralCamel}', '${modelPascal}');

    const ${modelPluralCamel} = await this.${modelCamel}AuthorizedService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    }, abilities);

    const count = await this.${modelCamel}AuthorizedService.count({
      where,
    }, abilities);

    return {
      ${modelPluralCamel}: ${modelPluralCamel}.slice(0, take),
      count,
      hasNextPage: typeof ${modelPluralCamel}[take] !== 'undefined',
    };
  `);
}
