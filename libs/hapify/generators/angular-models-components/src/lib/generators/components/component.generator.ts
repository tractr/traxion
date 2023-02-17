

import { plural } from 'pluralize';
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';
import { generateDecorator } from './decorator.generator';
import { generateImports } from './imports.generator';

import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';

export function generateComponentClass(
  model: Model,
  field: Field,
  projectScope: string,
): ClassDeclarationStructure {
  const className = `${pascal(model.name)}${pascal(field.name)}Component`;

  const methods: OptionalKind<MethodDeclarationStructure>[] = [
    {
      name: 'get validator',
      hasOverrideKeyword: true,
      returnType: '(control: AbstractControl) => ValidationErrors | null',
      statements: [
        `return this.${camel(model.name)}${pascal(
          field.name,
        )}Validator.validate;`,
      ],
    },
  ];

  const properties: OptionalKind<PropertyDeclarationStructure>[] = [
    {
      name: 'control',
      type: 'FormControl',
      initializer: "new FormControl('')",
    },
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: generateDecorator(model, field, projectScope),
    properties,
    extends: 'BaseControlValueAccessorComponent',
    implements: ['OnInit'],
    methods,
    ctors: generateConstructor(model, field),
  };
}

export function generateComponentSourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(
    plural(field.name),
  )}.component.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const directiveClass = generateComponentClass(model, field, projectScope);

  const imports = generateImports(model, field, projectScope);

  sourceFile.addImportDeclarations(imports);

  sourceFile.addClass(directiveClass);
}
