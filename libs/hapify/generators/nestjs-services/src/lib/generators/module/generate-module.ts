
import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';



export function generateModuleClass(): ClassDeclarationStructure {
  const className = `ModelsServicesModules`;


  const methods = [
 
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: `
    @Module({
      providers: MODELS_SERVICES_PROVIDERS,
      exports: MODELS_SERVICES_PROVIDERS,
    })
    ` }],
    // methods,

  };
}

export function generateModuleSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `models-services.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();
  const moduleClass = generateModuleClass();

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(moduleClass);
}
