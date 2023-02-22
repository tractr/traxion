

import { ImportDeclarationStructure, OptionalKind } from 'ts-morph';

import { generateImport } from '../../utils/import.generator';

import { Field, Model, pascal } from '@trxn/hapify-core';

export const generateImports = (model: Model, projectScope:string): OptionalKind<ImportDeclarationStructure>[] => 
{
  const imports = model.fields.map((f) => `${pascal(model.name)}${pascal(f.name)}Component`);

  return [
    generateImport('@angular/core', [
      'ChangeDetectionStrategy',
      'Component',
      'OnInit',
    ]),
    generateImport('@angular/commons', ['CommonModule']),
    generateImport('@angular/forms', [
      'ControlValueAccessor',
      'FormControl',
      'FormGroup',
      'FormsModule',
      'ReactiveFormsModule',
      'Validator',
    ]),
    generateImport(`@${projectScope}/trxn-angular-tools`, [
      'BaseControlValueAccessorComponent',
    ]),
    generateImport(`@${projectScope}/angular-models`, imports),
  ];}
  

