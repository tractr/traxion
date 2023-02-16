import {
  FunctionDeclarationStructure,
  OptionalKind,
  StructureKind,
} from 'ts-morph';

import { camel, Field, Model, pascal } from '@trxn/hapify-core';

export const generateValidateFunction = (
  model: Model,
  field: Field
): OptionalKind<FunctionDeclarationStructure> => ({
    name: `validate${pascal(model.name)}${pascal(field.name)}`,
    kind: StructureKind.Function,
    isExported: true,
    
    parameters: [
      {
        name: 'control',
        type: 'AbstractControl',
      },
    ],
    returnType: 'ValidatorFn',
    statements: `const validationResult = compose([${camel(field.name)}, required])(control);  
        
   return validationResult === null
      ? null
      : { ...validationResult, ${camel(model.name)}${pascal(field.name)}: true };`
  });
