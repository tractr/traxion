

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
  projectScope: string,
): ClassDeclarationStructure {
  const className = `${pascal(model.name)}FormControlComponent`;

  let initializer = '';
  model.fields.forEach((field) => {
    if(field.name === 'id') return;
    // add in the initializer a new ForControl for each field
    // TODO: change the nonNullable to the correct value, when hapify-core is updated
    initializer += `${camel(field.name)}: new FormControl('', { nonNullable: true }), \n`;
  });
  
  const properties: OptionalKind<PropertyDeclarationStructure>[] = [
  {
    name: 'control',
    type: 'FormGroup<UserFormControls>',
    initializer: `new FormGroup({
      ${initializer}
    })`,
  }];
  



  return {
    kind: StructureKind.Class,
    
    name: className,
    isExported: true,
    decorators: generateDecorator(model, projectScope),
    properties,
    extends: 'BaseControlValueAccessorComponent',
    implements: ['OnInit', 'ControlValueAccessor', 'Validator'],
    // methods,
    // ctors: generateConstructor(model, field),
  };
}

export function generateComponentSourceFile(
  project: Project,
  model: Model,
  path: string,
  projectScope: string,
) {
  const fileName = `${kebab(model.name)}.ts`;
  const filePath = `${path}/${kebab(model.name)}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const directiveClass = generateComponentClass(model, projectScope);


  const imports = generateImports(model, projectScope);

  sourceFile.addImportDeclarations(imports);

  sourceFile.addClass(directiveClass);
}
