import { camel, pascal } from 'case';
import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { isVirtualField, Model } from '@trxn/hapify-core';

export function generateFieldResolvers(
  model: Model,
): MethodDeclarationStructure[] {
  return model.fields.filter(isVirtualField).map((virtualField) => {
    const entityName = camel(model.name);
    const entityNamePlural = camel(model.pluralName);
    const entityType = pascal(model.name);
    const fieldName = camel(virtualField.name);
    const fieldModel =
      virtualField.relation.to.model.name === model.name
        ? virtualField.relation.from.model
        : virtualField.relation.to.model;
    const fieldType = pascal(fieldModel.name);

    // We need to know if the field is on a one or many relation
    // to know if we need to use findUnique or findMany
    const isOneRelation =
      (virtualField.relation.type === 'oneMany' &&
        virtualField.relation.to.model.name === model.name) ||
      virtualField.relation.type === 'oneOne';

    const parameters: ParameterDeclarationStructure[] = [
      {
        kind: StructureKind.Parameter,
        name: 'info',
        type: 'GraphQLResolveInfo',
        decorators: [{ name: 'Info', arguments: [] }],
      },
      {
        kind: StructureKind.Parameter,
        name: entityName,
        type: entityType,
        decorators: [{ name: 'Parent', arguments: [] }],
      },
    ];

    if (!isOneRelation) {
      parameters.push({
        kind: StructureKind.Parameter,
        name: 'findManyArgs',
        type: `FindMany${fieldType}Args`,
        decorators: [{ name: 'Args', arguments: [() => `{ nullable: true }`] }],
      });
    }

    const statements = isOneRelation
      ? `
      let { ${fieldName} } = ${entityName};

      if (typeof ${fieldName} === 'undefined') {
        if (!${entityName}.${fieldName}Id) {
          throw new Error('${fieldName}Id not found when fetching ${fieldName}');
        }
  
        const select = new PrismaSelect(info, {
          // defaultFields: OWNERS_DEFAULT_FIELDS,
        }).valueOf('${fieldName}', '${fieldType}') as Prisma.${fieldType}Args;

        const findUnique =  await this.${camel(fieldType)}Service.findUnique({
          where: { id: ${entityName}.${fieldName}Id },
          ...select,
        });

        ${fieldName} = findUnique || undefined;
      }
      
      return ${fieldName};`
      : `let { ${fieldName} } = ${entityName};

      if (typeof ${fieldName} === 'undefined') {
        const select = new PrismaSelect(info, {
          // defaultFields: OWNERS_DEFAULT_FIELDS,
        }).valueOf('${entityNamePlural}.${fieldName}', '${fieldType}') as Prisma.${fieldType}Args;

        ${fieldName} = await this.${camel(fieldType)}Service.findMany({
          ...findManyArgs,
          ...select
        });
      }
      
      return ${fieldName};`;

    return {
      kind: StructureKind.Method,
      name: fieldName,
      decorators: [
        {
          name: 'ResolveField',
          arguments: [`() => ${fieldType}`],
        },
      ],
      isAsync: true,
      parameters,
      statements,
    };
  });
}
