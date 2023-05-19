import { Project, StructureKind, VariableDeclarationKind } from 'ts-morph';

export function generateEncryptionServiceConstantSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `encryption-service.constant.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'ENCRYPTION_SERVICE',
        initializer: `'ENCRYPTION_SERVICE' as const`,
      },
    ],
  });
}
