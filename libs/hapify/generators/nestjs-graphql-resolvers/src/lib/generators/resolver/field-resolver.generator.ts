import { camel, pascal } from 'case';
import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { generateFieldResolverManyRelationStatement } from './field-resolver-many-relation';
import { generateFieldResolverOneRelationStatement } from './field-resolver-one-relation';

import { isVirtualField, Model } from '@trxn/hapify-core';

export function generateFieldResolvers(
  model: Model,
): MethodDeclarationStructure[] {
  return model.fields.filter(isVirtualField).map((virtualField) => {
    const entityName = camel(model.name);
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
      ? generateFieldResolverOneRelationStatement(model, virtualField)
      : generateFieldResolverManyRelationStatement(model, virtualField);

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
