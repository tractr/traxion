import { camel, pascal } from 'case';

import { ForeignField, Model, VirtualField } from '@trxn/hapify-core';

export function generateFieldResolverOneRelationStatement(
  model: Model,
  virtualField: VirtualField,
) {
  const entityName = camel(model.name);

  if (
    !('foreign' in virtualField.relation.to) ||
    virtualField.relation.to.foreign === null
  ) {
    // TODO catch that with type
    return 'not possible';
  }

  // Current Field
  const fieldName = camel(virtualField.name);

  const isCurrentForeignSided =
    virtualField.relation.to.virtual.name === virtualField.name;

  const foreignField = virtualField.relation.to.foreign;

  // Relation Field
  const relationModel = isCurrentForeignSided
    ? virtualField.relation.from.model
    : virtualField.relation.to.model;
  const relationType = pascal(relationModel.name);
  const relationField = isCurrentForeignSided
    ? virtualField.relation.from.virtual
    : virtualField.relation.to.virtual;

  const primaryField = isCurrentForeignSided
    ? model.primaryKey.fields
    : relationModel.primaryKey.fields;

  if (primaryField.length > 1 || foreignField.length > 1) {
    throw new Error(
      'Composite primary keys and foreign keys are not supported yet',
    );
  }

  const primaryKey = camel(primaryField[0].name);
  const foreignKey = camel(foreignField[0].name);

  const findUniqueCondition = isCurrentForeignSided
    ? `{ ${primaryKey}: ${entityName}.${foreignKey} }`
    : `{ ${foreignKey}: ${entityName}.${primaryKey} }`;

  return `
  let { ${fieldName} } = ${entityName};

  if (typeof ${fieldName} === 'undefined') {
    ${
      isCurrentForeignSided
        ? `if (!${entityName}.${foreignKey}) {
      throw new Error('${fieldName} not found when fetching ${fieldName}');
    }`
        : ''
    }

    const select = new PrismaSelect(info, {
      // defaultFields: OWNERS_DEFAULT_FIELDS,
    }).valueOf(
      getPathFromGraphQLResolveInfo(info.path),
      '${relationType}'
    ) as Prisma.${relationType}Args;

    const findUnique =  await this.${camel(relationType)}Service.findUnique({
      where: ${findUniqueCondition},
      ...select,
    });

    ${fieldName} = findUnique || undefined;
  }

  return ${fieldName};
  `;
}
