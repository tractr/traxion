
import { ImportDeclarationStructure, ImportEqualsDeclaration, SourceFile, StructureKind, VariableDeclarationKind } from 'ts-morph';

import { Model, pascal, snake } from '@trxn/hapify-core';
import { generateImports } from './imports.generator';
import { addIndex } from '../../utils/add-index';

export function generateServicesProvidersFile(
  sourceFile: SourceFile,
  model: Model,
) {

  const name = `${model.name}`;

  const imports: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `${model.name}_SERVICES_PROVIDERS`,
    namedImports: [{ name: `${pascal(model.name)}Service` }],
  }
  sourceFile.addImportDeclaration(imports);

  // sourceFile.addVariableStatement({
  //   isExported: true,
  //   declarationKind: VariableDeclarationKind.Const,
  //   declarations: [
  //     {
  //       name,
  //       type: 'Provider[]',
  //       initializer: `[
  //         {
  //           provide: ${model.name.toUpperCase()}_SERVICE,
  //           useClass: ${pascal(model.name)}Service,
  //         }
  //       ]`,
  //     },
  //   ],
  // });

}
