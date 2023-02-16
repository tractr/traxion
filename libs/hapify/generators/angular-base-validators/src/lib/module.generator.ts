
import { ClassDeclarationStructure, Project,StructureKind } from "ts-morph";

import { generateImport } from "./utils/import.generator";

import { Field, Model } from '@trxn/hapify-core';

export function generateValidatorClass(): ClassDeclarationStructure {

  return {
    kind: StructureKind.Class,
    name: 'AngularModelsValidatorsModule',
    isExported: true,
    decorators: [{ name: `@NgModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularModelsServicesModule,
      ],
    })` }],
  };
}


export function generateModuleSourceFile(
  project: Project,
  path: string,
) {
  const filePath = `${path}/angular-models-validators.module.ts`;

  const sourceFile = project.createSourceFile(filePath);

  
  const imports = [
    generateImport('@angular/core',[ 'Injectable']),
    generateImport('@angular/forms',[ 'ValidatorFn']),
    generateImport('@poc/trxn-angular-tools',['required'])
  ]
  
  
  const moduleClass = generateValidatorClass();


  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(moduleClass);

}