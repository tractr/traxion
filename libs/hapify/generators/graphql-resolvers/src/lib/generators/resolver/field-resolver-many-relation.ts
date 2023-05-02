import { camel, pascal } from 'case';

import { Model, VirtualField } from '@trxn/hapify-core';

export function generateFieldResolverManyRelationStatement(
  model: Model,
  virtualField: VirtualField,
  // & { relation: { type: 'oneMany' | 'manyMany' } },
) {
  const entityName = camel(model.name);
  const fieldName = camel(virtualField.name);

  const relationModel =
    virtualField.relation.to.model.name === model.name
      ? virtualField.relation.from.model
      : virtualField.relation.to.model;
  const relationFieldType = pascal(relationModel.name);

  const relationField =
    virtualField.relation.to.model.name === model.name
      ? virtualField.relation.from.virtual
      : virtualField.relation.to.virtual;

  return `
  let { ${fieldName} } = ${entityName};

  if (typeof ${fieldName} === 'undefined') {
    const select = new PrismaSelect(info, {
      // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
    }).valueOf(
      getPathFromGraphQLResolveInfo(info.path),
      '${relationFieldType}',
    ) as Prisma.${relationFieldType}Args;

    const where: Prisma.${relationFieldType}WhereInput = {
      AND: [
        {
          ${relationField.name}: ${
    !relationField.isMultiple
      ? `{ id: ${entityName}.id }`
      : `{
              some: {
                id: ${entityName}.id,
              },
            }`
  },
        },
        findManyArgs.where || {},
      ],
    };

    ${fieldName} = await this.${camel(relationFieldType)}Service.findMany({
      ...findManyArgs,
      where,
      ...select,
    });
  }

  return ${fieldName};
  `;
}
