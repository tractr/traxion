import { camel, pascal } from 'case';
import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { getAllModelsFromRelation, Model } from '@trxn/hapify-core';

export function generateConstructor(
  model: Model,
): ConstructorDeclarationStructure {
  return {
    kind: StructureKind.Constructor,
    parameters: [
      {
        kind: StructureKind.Parameter,
        name: `${camel(model.name)}Service`,
        type: `${pascal(model.name)}Service`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [],
      },
      {
        kind: StructureKind.Parameter,
        name: `${camel(model.name)}DefaultService`,
        type: `${pascal(model.name)}DefaultService`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [],
      },
      {
        kind: StructureKind.Parameter,
        name: `${camel(model.name)}DefaultService`,
        type: `${pascal(model.name)}DefaultService`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [],
      },
      ...getAllModelsFromRelation(model).map((relatedModel) => ({
        kind: StructureKind.Parameter as const,
        name: `${camel(relatedModel.name)}Service`,
        type: `${pascal(relatedModel.name)}Service`,
        scope: Scope.Private,
        isReadonly: true,
        decorators: [],
      })),
    ],
  };
}
