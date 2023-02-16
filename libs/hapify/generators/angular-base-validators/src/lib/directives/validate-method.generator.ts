// validate(control: AbstractControl): ValidationErrors | null {
//   return validateUserEmail(control);
// }

import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { camel, Field, Model, pascal } from '@trxn/hapify-core';

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
