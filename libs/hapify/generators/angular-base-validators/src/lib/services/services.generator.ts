

import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImport } from '../utils/import.generator';
import { generateValidateMethod } from '../validators/validate-method.generator';

import { Field, kebab, Model, pascal } from '@trxn/hapify-core';

export function generateServiceClass(model: Model,field: Field): ClassDeclarationStructure {
  const className = `${pascal(model.name)}${pascal(field.name)}Validator`;

  const methods = [
    generateValidateMethod(model,field)
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    methods,
    isExported: true,
    decorators: [{ name: `Injectable({
      providedIn: AngularModelsValidatorsModule,
    })` }],
   implements: ['Validator'],
  };
};


export function generateServiceSourceFile(
  project: Project,
  model: Model,
  field:Field,
  path: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(field.name)}.service`;
  const filePath = `${path}/services/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  
  const imports = [
    generateImport('@angular/core',[ 'Injectable']),
    generateImport('@angular/forms',['AbstractControl', 'ValidationErrors','Validator']),
    generateImport('AngularModelsValidatorsModule',['AngularModelsValidatorsModule']),
    generateImport('../validators',['validateUserEmail'])
  ]
  
  
  const validatorClass = generateServiceClass(model, field);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(validatorClass);

}


