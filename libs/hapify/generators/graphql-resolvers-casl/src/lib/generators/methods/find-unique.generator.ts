import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFindUniqueMethod(
  model: Model,
  resolver: ClassDeclaration,
) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  const findUniqueMethod = resolver.getMethod(`findUnique${modelPascal}`);

  if (!findUniqueMethod)
    throw new Error(
      `Method findUnique${modelPascal} not found in ${resolver.getName()}`,
    );

  findUniqueMethod.addDecorators([
    {
      name: 'Policies',
      arguments: [`READ_${modelConstant}`],
    },
  ]);

  findUniqueMethod.addParameters([
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

  findUniqueMethod.setBodyText(`
    const select = new PrismaSelect(info, {
      defaultFields: defaultOwnershipSelect,
    }).value as Prisma.${modelPascal}Args;

    const ${modelCamel} = await this.${modelCamel}AuthorizedService.findUnique({ where, ...select }, abilities);

    return ${modelCamel};
  `);
}
