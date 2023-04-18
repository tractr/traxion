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
    const entityType = pascal(model.name);
    const fieldName = camel(virtualField.name);
    const fieldType = pascal(
      virtualField.relation.to.model.name === model.name
        ? virtualField.relation.from.model.name
        : virtualField.relation.to.model.name,
    );

    const parameters: ParameterDeclarationStructure[] = [
      {
        kind: StructureKind.Parameter,
        name: entityName,
        type: entityType,
        decorators: [{ name: 'Parent', arguments: [] }],
      },
    ];

    const statements = `return ${entityName}.${fieldName};`;

    return {
      kind: StructureKind.Method,
      name: fieldName,
      decorators: [
        {
          name: 'ResolveField',
          arguments: [`() => ${fieldType}`],
        },
      ],
      parameters,
      statements,
    };
  });
}
