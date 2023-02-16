import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImport } from '../utils/import.generator';
import { generateValidateFunction } from './validate-function.generator';
import { generateValidateMethod } from './validate-method.generator';

import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';


export function generateValidatorClass(model: Model,field: Field): ClassDeclarationStructure {
  const className = `${pascal(model.name)}${pascal(field.name)}Validator`;

  const methods = [
    generateValidateMethod(model,field)
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'Injectable()' }],
    implements: ['Validator'],

    methods,
  };
}


export function generateValidatorSourceFile(
  project: Project,
  model: Model,
  field:Field,
  path: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(field.name)}.validator`;
  const filePath = `${path}/validators/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  
  const imports = [
    generateImport('@angular/core',[ 'Injectable']),
    generateImport('@angular/forms',['AbstractControl', 'ValidationErrors','Validator', 'ValidatorFn']),
    generateImport('@poc/trxn-angular-tools',[`${camel(field.name)}`, 'compose', 'required'])
  ]
  
  
  const validatorClass = generateValidatorClass(model, field);
  const functionDeclaration= generateValidateFunction(model, field)

  sourceFile.addImportDeclarations(imports);
  sourceFile.addFunction(functionDeclaration)
  sourceFile.addClass(validatorClass);

}
