
import {
  ConstructorDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Scope,
} from 'ts-morph';

import { camel, Field, Model, pascal } from '@trxn/hapify-core';

export const generateConstructor = (model: Model, field: Field): OptionalKind<ConstructorDeclarationStructure>[]  => {

  const parameters: OptionalKind<ParameterDeclarationStructure>[] = [
    {
      name: `${camel(model.name)}${pascal(
        field.name,
      )}Validator`,
      type: `${pascal(model.name)}${pascal(field.name)}Validator`,
      scope: Scope.Public,
    },
    {
      name: 'ngControl',
      type: 'NgControl',
      hasQuestionToken: true,
      decorators: [
        {
          name: 'Self()',
        },
        {
          name: 'Optional()',
        },
      ],
      scope: Scope.Public,
      hasOverrideKeyword: true,
    },
  ];

  return [
    {
      parameters,
      statements: [
        `super(ngControl);`,
      ],
    },
  ];

};