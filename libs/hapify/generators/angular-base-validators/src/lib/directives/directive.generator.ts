import { ClassDeclarationStructure, DecoratorStructure, OptionalKind, Project, StructureKind } from 'ts-morph';

import { generateImport } from '../utils/import.generator';
import { generateValidateMethod } from './validate-method.generator';

import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';


export function generateDirectiveClass(model: Model,field: Field): ClassDeclarationStructure {
  const className = `Validate${pascal(model.name)}${pascal(field.name)}Directive`;

  const methods = [
    generateValidateMethod(model,field)
  ];
  const prefix = 'poc' // TODO: add prefix

  const decorators: OptionalKind<DecoratorStructure>[] = [
    {
      name: 'Directive',
      arguments: [
        `{
          selector: '[${prefix}Validate${camel(model.name)}${pascal(field.name)}]',
          providers: [
            {
              provide: NG_VALIDATORS,
              useExisting: ${className},
              multi: true,
            },
          ],
        }`,
      ],
    },
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators,
    implements: ['Validator'],
    methods,
  };
}


export function generateDirectiveSourceFile(
  project: Project,
  model: Model,
  field:Field,
  path: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(field.name)}.directive`;
  const filePath = `${path}/directives/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const validatorClass = generateDirectiveClass(model, field);
  const imports = [
    generateImport('@angular/core',[ 'Injectable']),
    generateImport('@angular/forms',['AbstractControl', 'ValidationErrors','Validator', 'ValidatorFn']),
    generateImport('../validators',['UserEmailValidator'])
  ]
  // const functionDeclaration= generateValidateFunction(model, field)

  sourceFile.addImportDeclarations(imports);
  // sourceFile.addFunction(functionDeclaration)
  
  sourceFile.addClass(validatorClass);

}
