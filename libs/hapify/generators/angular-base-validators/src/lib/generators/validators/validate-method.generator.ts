import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { Field, Model, pascal } from '@trxn/hapify-core';

export const generateValidateMethod = (
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
    statements: `validate${pascal(model.name)}${pascal(field.name)}(control);`,

  };
};
