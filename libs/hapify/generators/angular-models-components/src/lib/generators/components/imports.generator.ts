

import { ImportDeclarationStructure, OptionalKind } from 'ts-morph';

import { generateImport } from '../../utils/import.generator';

import { Field, Model, pascal } from '@trxn/hapify-core';

export const generateImports = (model: Model, field: Field, projectScope:string): OptionalKind<ImportDeclarationStructure>[] => [
    generateImport(
      '@angular/core',
      ['ChangeDetectionStrategy', 'Component', 'OnInit', 'Optional', 'Self'],
    ),
    generateImport(
      '@angular/forms',
      [
        'AbstractControl',
        'FormControl',
        'FormsModule',
        'NgControl',
        'ReactiveFormsModule',
        'ValidationErrors',
      ],
    ),
    generateImport(
      `@${projectScope}/angular-models-validators`,
      [`${pascal(model.name)}${pascal(field.name)}Validator`],
    ),
    generateImport(
      '@trxn/angular-tools',
      ['BaseControlValueAccessorComponent'],
    ),
    generateImport(
      '@trxn/angular-ui',
      [`${pascal(model.name)}${pascal(field.name)}UiComponent`],
    ),
    generateImport(
      `@${projectScope}/angular-models-validators`,
      [`${pascal(model.name)}${pascal(field.name)}ValidatorModule`],
    ),
    generateImport('@angular/common', ['CommonModule']),
  ]

