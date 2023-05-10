import { kebab, pascal, upper } from 'case';
import {
  ImportDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-casl`,
      namedImports: [{ name: `Action` }, { name: `policyFactory` }],
    },
  ];
}

export function generatePolicy(project: Project, model: Model, path: string) {
  const fileName = `${kebab(model.name)}.policy.ts`;
  const filePath = `${path}/policies/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations(generateImports());

  const permissions: Record<string, string> = {
    COUNT: 'Action.Count',
    CREATE: 'Action.Create',
    READ: 'Action.Read',
    SEARCH: 'Action.Search',
    UPDATE: 'Action.Update',
    UPSERT: '[Action.Create, Action.Update]',
    DELETE: 'Action.Delete',
  };

  Object.keys(permissions).forEach((permission) => {
    sourceFile.addVariableStatement({
      kind: StructureKind.VariableStatement,
      isExported: true,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: `${permission}_${upper(model.name)}`,
          initializer: `policyFactory(${permissions[permission]}, '${pascal(
            model.name,
          )}')`,
        },
      ],
    });
  });
}
