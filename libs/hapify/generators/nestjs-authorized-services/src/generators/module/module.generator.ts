import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

export function generateModuleClass(): ClassDeclarationStructure {
  const className = `AuthorizedServicesModules`;

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    extends: `ConfigurableModuleClass`,
    decorators: [
      {
        name: `Module({
      providers: AUTHORIZED_SERVICES_PROVIDERS,
      exports: AUTHORIZED_SERVICES_PROVIDERS,
    })`,
      },
    ],
  };
}

export function generateModuleSourceFile(project: Project, path: string) {
  const fileName = `authorized-services.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();
  const moduleClass = generateModuleClass();

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(moduleClass);
}
