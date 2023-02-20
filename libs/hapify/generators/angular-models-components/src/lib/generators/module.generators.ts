import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImport } from '../utils/import.generator';

/**
 *  generate a validator class for the module
 * 
 * @returns ClassDeclarationStructure
 */
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
/** 
 * generate a module source file
*/
export function generateModuleSourceFile(project: Project, path: string) {
  const filePath = `${path}/angular-models-validators.module.ts`;

  const sourceFile = project.createSourceFile(filePath);

  // generate imports
  const imports = [
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
