import { Project } from 'ts-morph';

import { generateImport } from '../../utils/import.generator';
import { generateValidateFunction } from './validate-function.generator';

import { Field, kebab, Model } from '@trxn/hapify-core';

export function generateValidatorSourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
) {
  // create path
  const fileName = `${kebab(model.name)}-${kebab(field.name)}.validator`;
  const filePath = `${path}/validators/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  // generate imports
  const imports = [
    generateImport('@angular/forms', ['AbstractControl', 'ValidatorFn']),
    generateImport('@poc/trxn-angular-tools', ['compose']), // TODO: add validators when hapify is ready
  ];

  const functionDeclaration = generateValidateFunction(model, field);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addFunction(functionDeclaration);
}
