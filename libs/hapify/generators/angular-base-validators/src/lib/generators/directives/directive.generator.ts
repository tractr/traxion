import {
  ClassDeclarationStructure,
  ConstructorDeclarationStructure,
  DecoratorStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateImport } from '../../utils/import.generator';
import { generateDirectiveValidateMethod } from './validate-method.generator';

import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';

export function generateDirectiveClass(
  model: Model,
  field: Field,
  projectScope: string,
): ClassDeclarationStructure {
  const className = `Validate${pascal(model.name)}${pascal(
    field.name,
  )}Directive`;

  const parameters: OptionalKind<ParameterDeclarationStructure>[] = [
    {
      name: `${camel(model.name)}${pascal(field.name)}Validator`,
      kind: StructureKind.Parameter,
      type: `${pascal(model.name)}${pascal(field.name)}Validator`,
      scope: Scope.Private,
    },
  ];

  const ctors: OptionalKind<ConstructorDeclarationStructure>[] = [
    {
      parameters,
    },
  ];
  const methods = [generateDirectiveValidateMethod(model, field)];

  const decorators: OptionalKind<DecoratorStructure>[] = [
    {
      name: 'Directive',
      arguments: [
        `{
  standalone: true,
  selector: '[${camel(projectScope)}Validate${pascal(model.name)}${pascal(
          field.name,
        )}]',
  providers: [
    {
      provide: ${pascal(model.name)}${pascal(field.name)}Validator,
      useClass: ${pascal(model.name)}${pascal(field.name)}Validator,
    },
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
    ctors,
  };
}

export function generateDirectiveSourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(field.name)}.directive`;
  const filePath = `${path}/directives/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const directiveClass = generateDirectiveClass(model, field, projectScope);

  // generate imports
  const imports = [
    generateImport('@angular/core', ['Directive']),
    generateImport('@angular/forms', [
      'AbstractControl',
      'NG_VALIDATORS',
      'ValidationErrors',
      'Validator',
    ]),
    generateImport('../validators', [
      `${pascal(model.name)}${pascal(field.name)}Validator`,
    ]),
  ];

  sourceFile.addImportDeclarations(imports);

  sourceFile.addClass(directiveClass);
}
