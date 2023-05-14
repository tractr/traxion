import { camel, pascal } from 'case';
import {
  ImportDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import { isForeignField, isPrimaryField, Model, or } from '@trxn/hapify-core';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../types`,
      namedImports: [{ name: `DefaultOwnershipSelect` }],
    },
  ];
}

export function generateDefaultOwnershipSelectConstantSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `default-ownership-select.constant.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'defaultOwnershipSelect',
        type: 'DefaultOwnershipSelect',
        initializer: `{
          ${models
            .map(
              (model) =>
                `${pascal(model.name)}: {
              ${model.fields
                .filter(or(isPrimaryField, isForeignField))
                .map((field) => `${camel(field.name)}: true`)
                .join(',\n')}
            }`,
            )
            .join(',\n')}
        }`,
      },
    ],
  });

  sourceFile.addImportDeclarations(imports);
}
