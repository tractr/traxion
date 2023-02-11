import {
  ImportDeclarationStructure,
  SourceFile,
  StructureKind,
} from 'ts-morph';

import { Model, pascal } from '@trxn/hapify-core';

export function generateServicesProvidersFile(
  sourceFile: SourceFile,
  model: Model,
) {
  const imports: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `${model.name}_SERVICES_PROVIDERS`,
    namedImports: [{ name: `${pascal(model.name)}Service` }],
  };
  sourceFile.addImportDeclaration(imports);
}
