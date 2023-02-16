import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImport } from '../utils/import.generator';

export function generateValidatorClass(): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: 'AngularModelsValidatorsModule',
    isExported: true,
    decorators: [
      {
        name: `NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      AngularModelsServicesModule,
    ],
    })`,
      },
    ],
  };
}

export function generateModuleSourceFile(project: Project, path: string) {
  const filePath = `${path}/angular-models-validators.module.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = [
    //     import { NgModule } from '@angular/core';
    // import { CommonModule } from '@angular/common';
    // import { ReactiveFormsModule, FormsModule } from '@angular/forms';
    // import { AngularModelsServicesModule } from '@poc/angular-models-services';
    generateImport('@angular/core', ['NgModule']),
    generateImport('@angular/commons', ['CommonModule']),
    generateImport('@angular/forms', ['ReactiveFormsModule', 'FormsModule']),
    generateImport('@poc/angular-models-services', [
      'AngularModelsServicesModule',
    ]),
  ];

  const moduleClass = generateValidatorClass();

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(moduleClass);
}
