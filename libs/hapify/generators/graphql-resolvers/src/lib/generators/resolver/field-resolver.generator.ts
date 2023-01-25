import { camel, pascal } from 'case';
import {
  DecoratorStructure,
  JSDocStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFieldResolvers(
  model: Model,
): MethodDeclarationStructure[] {
  return [];
  // return model.fields.filter(isEntity).map((field) => {
  //   const entityName = camel(model.name);
  //   const entityType = pascal(model.name);
  //   const fieldName = camel(field.name);
  //   const fieldType = pascal(field.model.name);

  //   const parameters: ParameterDeclarationStructure[] = [
  //     {
  //       kind: StructureKind.Parameter,
  //       name: entityName,
  //       type: entityType,
  //       decorators: [{ name: 'Parent', arguments: [] }],
  //     },
  //   ];

  //   const statements = `return ${entityName}.${fieldName};`;

  //   return {
  //     kind: StructureKind.Method,
  //     name: fieldName,
  //     decorators: [
  //       {
  //         name: 'ResolveField',
  //         arguments: [`() => ${fieldType}`],
  //       },
  //     ],
  //     parameters,
  //     statements,
  //   };
  // });
}
