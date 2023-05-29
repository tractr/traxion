import {
  ImportDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../interfaces`,
      namedImports: [{ name: `DefaultOwnershipSelect` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../authorized-services.module-definition`,
      namedImports: [{ name: `MODULE_OPTIONS_TOKEN` }],
    },
  ];
}

export function generateDefaultOwnershipSelectProviderSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `default-ownership-select.service.ts`;
  const filePath = `${path}/services/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();
  sourceFile.addImportDeclarations(imports);

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'DEFAULT_OWNERSHIP_SELECT',
        initializer: `'DEFAULT_OWNERSHIP_SELECT'`,
      },
    ],
  });

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'DefaultOwnershipSelectProvider',
        initializer: `{
          provide: DEFAULT_OWNERSHIP_SELECT,
          useFactory: (options: DefaultOwnershipSelect) => options.defaultOwnershipSelect,
          inject: [MODULE_OPTIONS_TOKEN]
        }`,
      },
    ],
  });
}
