import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { camel, Field, Model, pascal } from '@trxn/hapify-core';

export const generateDirectiveValidateMethod = (
  model: Model,
  field: Field,
): MethodDeclarationStructure => {
  const parameters: ParameterDeclarationStructure[] = [
    {
      name: 'control',
      kind: StructureKind.Parameter,
      type: `AbstractControl`,
    },
  ];

  return {
    kind: StructureKind.Method,
    name: 'validate',
    returnType: 'ValidationErrors | null',
    parameters,
    statements: `return this.${camel(model.name)}${pascal(
      field.name,
    )}Validator.validate(control);`,
  };
};
